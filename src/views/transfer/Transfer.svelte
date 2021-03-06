<script lang="ts">
  import { allLeagues, defaultLeague } from "@/stores/leagues";
  import { ninjaData, fetchData } from "@/stores/ninja";
  import { wait } from "@/util/api";
  import type { Item } from "./types";
  import { onDestroy } from "svelte";
  import Table from "./components/Table.svelte";
  import CategoriesHeader from "@/components/CategoriesHeader.svelte";
  import { getProfit, getProfitMargin } from "@/util/profitCalc";
  import { CATEGORIES, ECategory } from "@/stores/ninja/constants";
  import { ICONS } from "./constants";

  onDestroy(() => {
    ninjaData.set({
      ...$ninjaData,
      data: null,
    });
  });

  const processItems = (): void => {
    const computedItems: Record<string, Item> = {};
    for (const item of $ninjaData.data[$defaultLeague.name][category]) {
      const name =
        item.currencyTypeName ||
        `${item.name}${item.variant ? " " + item.variant : ""}${
          item.links ? " (" + item.links + "L)" : ""
        }${item.mapTier ? " (T" + item.mapTier + ")" : ""}` ||
        item.baseType;
      const icon =
        item.icon ||
        $ninjaData.icons[
          name
            .replace(
              / \d+ passives|Replica | Penetration| Added Spells| Added Attacks| Conversion/gm,
              ""
            )
            .replace(item.variant ? item.variant : "", "")
        ];
      computedItems[item.detailsId] = {
        icon,
        name,
        originalName: item.currencyTypeName || item.name || item.baseType,
        leagueCE: item.chaosEquivalent || item.chaosValue,
        standardCE: 0,
        profitMargin: 0,
        profit: 0,
        explicit: "",
        detailsId: item.detailsId,
      };
    }

    for (const item of $ninjaData.data.Standard[category]) {
      if (item.detailsId in computedItems) {
        computedItems[item.detailsId].standardCE =
          item.chaosEquivalent || item.chaosValue;
        computedItems[item.detailsId].profit = getProfit(
          computedItems[item.detailsId].standardCE,
          computedItems[item.detailsId].leagueCE
        );
        computedItems[item.detailsId].profitMargin = getProfitMargin(
          computedItems[item.detailsId].standardCE,
          computedItems[item.detailsId].leagueCE
        );
        let modifiers =
          "implicitModifiers" in item
            ? [...item.implicitModifiers.map((mod) => mod.text)]
            : [];
        modifiers =
          "explicitModifiers" in item
            ? [...modifiers, ...item.explicitModifiers.map((mod) => mod.text)]
            : [...modifiers];
        modifiers =
          "prophecyText" in item
            ? [...modifiers, item.prophecyText]
            : [...modifiers];
        computedItems[item.detailsId].explicit = [...modifiers].join("\n");
      }
    }
    items = Object.values(computedItems).filter(
      (item: Item) => item.profit > 0
    );
  };

  const fetchCategoryData = async (e: CustomEvent<any>) => {
    category = e.detail;
    ninjaData.set({
      ...$ninjaData,
      loading: true,
      error: "",
    });
    await wait(500);
    await fetchData({
      leagues: [$defaultLeague, $allLeagues.find((l) => l.name === "Standard")],
      categories: [category],
    });
    processItems();
  };

  let category: ECategory = null;
  let items: Item[] = [];
  $: document.title = `${
    category ? category + " transfer" : "League transfer"
  }`;
</script>

<div class="container">
  <CategoriesHeader
    icons={ICONS}
    categories={CATEGORIES}
    on:changeCategory={fetchCategoryData}
  />
  {#if category}
    <Table {items} />
  {/if}
</div>

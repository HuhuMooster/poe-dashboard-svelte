<script lang="ts">
  import {
    defaultLeague,
    activeLeagues,
    selectedLeague,
  } from "@/stores/leagues";
  import { ninjaData, fetchData } from "@/stores/ninja";
  import { wait } from "@/util/api";
  import type { Item } from "./types";
  import { onDestroy } from "svelte";
  import Table from "./components/Table.svelte";
  import LeagueSelect from "../home/components/LeagueSelect.svelte";
  import CategoriesHeader from "@/components/CategoriesHeader.svelte";
  import { getProfit, getProfitMargin } from "@/util/profitCalc";
  import { CATEGORIES, EFlipperCategory, ICONS } from "./constants";
  import { BREACH } from "./data/breach";
  import { BETRAYAL } from "./data/betrayal";
  import { DIVINATION_CARDS } from "./data/divination_cards";
  import { INCURSION } from "./data/incursion";
  import { GUARDIANS } from "./data/guardians";

  onDestroy(() => {
    ninjaData.set({
      ...$ninjaData,
      data: null,
    });
    selectedLeague.set($defaultLeague);
  });

  const getCategoryEntries = (category: EFlipperCategory) => {
    switch (category) {
      case EFlipperCategory.betrayal:
        return BETRAYAL;
      case EFlipperCategory.breach:
        return BREACH;
      case EFlipperCategory.divinationCards:
        return DIVINATION_CARDS;
      case EFlipperCategory.incursion:
        return INCURSION;
      case EFlipperCategory.guardians:
        return GUARDIANS;
      default:
        return [];
    }
  };

  const processItems = (): void => {
    let entries = getCategoryEntries(category);

    const computedItems: Record<string, Item> = {};
    for (const item of entries) {
      const name = item.name;
      const icon = item.icon || $ninjaData.icons[name];
      computedItems[item.detailsId] = {
        icon,
        name,
        cost: 0,
        revenue: 0,
        profit: 0,
        profitMargin: 0,
        explicit: "",
        detailsId: item.detailsId,
      };

      const cost = [];
      const revenue = [];
      let explicit = `${item.costItems
        .map((ci) => `${ci.count} * ${ci.name}`)
        .join(" + ")} = `;

      for (const ci of item.costItems) {
        const filteredCostItems = $ninjaData.data[$selectedLeague.name][
          ci.category
        ].filter((i) => i.detailsId === ci.detailsId)[0];
        if (filteredCostItems !== undefined) {
          cost.push(
            ci.count *
              ("chaosEquivalent" in filteredCostItems
                ? filteredCostItems.chaosEquivalent
                : filteredCostItems.chaosValue)
          );
        }
      }
      computedItems[item.detailsId].cost = cost.reduce((a, b) => a + b, 0);
      if ("revenueItems" in item) {
        // @ts-ignore
        explicit += `${item.revenueItems
          .map((ri) => `${ri.count} * ${ri.name}`)
          .join(" + ")}`;
        // @ts-ignore
        for (const ri of item.revenueItems) {
          const filteredRevenueItems = $ninjaData.data[$selectedLeague.name][
            ri.category
          ].filter((i) => i.detailsId === ri.detailsId)[0];
          // if (filteredRevenueItems !== undefined) {
          !!filteredRevenueItems &&
            revenue.push(
              ri.count *
                ("chaosEquivalent" in filteredRevenueItems
                  ? filteredRevenueItems.chaosEquivalent
                  : filteredRevenueItems.chaosValue)
            );
          // }
        }
        computedItems[item.detailsId].revenue = revenue.reduce(
          (a, b) => a + b,
          0
        );
      } else {
        explicit += `${item.count} * ${item.name}`;
        const filteredRevenueItem = $ninjaData.data[$selectedLeague.name][
          item.category
        ].filter((i) => i.detailsId === item.detailsId)[0];
        if (filteredRevenueItem !== undefined) {
          const itemRevenue =
            "chaosEquivalent" in filteredRevenueItem
              ? filteredRevenueItem.chaosEquivalent
              : filteredRevenueItem.chaosValue;
          computedItems[item.detailsId].revenue = parseFloat(
            (itemRevenue * item.count).toFixed(2)
          );
        }
      }
      computedItems[item.detailsId].explicit = explicit;
      computedItems[item.detailsId].profit = getProfit(
        computedItems[item.detailsId].revenue,
        computedItems[item.detailsId].cost
      );
      const profitMargin = getProfitMargin(
        computedItems[item.detailsId].revenue,
        computedItems[item.detailsId].cost
      );
      computedItems[item.detailsId].profitMargin = isNaN(profitMargin)
        ? Infinity
        : profitMargin;
    }
    items = Object.values(computedItems).filter(
      (item: Item) => item.cost > 0 && item.revenue > 0
    );
  };

  const fetchNinjaData = async () => {
    ninjaData.set({
      ...$ninjaData,
      loading: true,
      error: "",
    });
    await wait(500);
    await fetchData({
      leagues: [$selectedLeague],
      categories: CATEGORIES[category],
    });
  };

  const setCategory = async (e: CustomEvent<any>) => {
    category = e.detail;
    if (!category) return;
    await fetchNinjaData();
    processItems();
  };

  let category: EFlipperCategory = null;
  let items: Item[] = [];
  $: document.title = `${category ? category + " flipper" : "League flipper"}`;
</script>

<div class="container">
  <CategoriesHeader
    icons={ICONS}
    categories={CATEGORIES}
    on:changeCategory={setCategory}
  />
  <div class="league-container">
    <LeagueSelect
      leagueOptions={$activeLeagues}
      callback={async () => {
        await fetchNinjaData();
        processItems();
      }}
    />
  </div>
  {#if category}
    <Table {items} />
  {/if}
</div>

<style>
  .league-container {
    margin: 1em 2em;
  }
</style>

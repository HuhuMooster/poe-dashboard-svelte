<script lang="ts">
  import { ECategory, CATEGORIES } from "@/stores/ninja/constants";
  import { createEventDispatcher } from "svelte";
  import LayoutGrid, { Cell } from "@smui/layout-grid";
  import Tooltip, { Wrapper } from "@smui/tooltip";

  const dispatch = createEventDispatcher();
  const changeCategory = (category: string) => {
    dispatch("changeCategory", category);
  };

  const icons = {
    [ECategory.currency]:
      "https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyRerollRare.png?scale=1&w=1&h=1",
    [ECategory.fragments]:
      "https://web.poecdn.com/image/Art/2DItems/Maps/AtlasMaps/FragmentPhoenix.png?scale=1&w=,1&h=1",
    [ECategory.invitations]:
      "https://web.poecdn.com/image/Art/2DItems/Currency/Atlas/NullVoid5.png?w=1&h=1&scale=1",
    [ECategory.delirium_orbs]:
      "https://web.poecdn.com/image/Art/2DItems/Currency/Delirium/DeliriumOrbScarabs.png?w=1&h=1&scale=1",
    [ECategory.watchstones]:
      "https://web.poecdn.com/image/Art/2DItems/Currency/Strongholds/IvoryWatchstone5.png?scale=1&w=1&h=1",
    [ECategory.oils]:
      "https://web.poecdn.com/image/blight/items/OpalescentOil.png?scale=1&w=1&h=1",
    [ECategory.incubators]:
      "https://web.poecdn.com/image/Art/2DItems/Currency/Incubation/IncubationAbyss.png?scale=1&w=1&h=1",
    [ECategory.scarabs]:
      "https://web.poecdn.com/image/Art/2DItems/Currency/Scarabs/GreaterScarabBreach.png?sca,le=1&scaleIndex=0&w=1&h=1",
    [ECategory.fossils]:
      "https://web.poecdn.com/image/Art/2DItems/Currency/Delve/SanctifiedFossil.png?w=,1&h=1",
    [ECategory.resonators]:
      "https://web.poecdn.com/image/Art/2DItems/Currency/Delve/Reroll2x2A.png?w=1&h=1",
    [ECategory.essences]:
      "https://web.poecdn.com/image/Art/2DItems/Currency/Essence/Woe7.png?scale=1&w=1&h=1",
    [ECategory.cards]:
      "https://web.poecdn.com/image/Art/2DItems/Divination/InventoryIcon.png?scale=1&w=1&h=1,",
    [ECategory.prophecies]:
      "https://web.poecdn.com/image/Art/2DItems/Currency/ProphecyOrbRed.png?scale=1&w=1&h=1",
    [ECategory.gems]:
      "https://web.poecdn.com/image/Art/2DItems/Gems/Portal.png?scale=1&scaleIndex=0&w=1&h=1",
    [ECategory.base_types]:
      "https://web.poecdn.com/image/Art/2DItems/Rings/OpalRing.png?scale=1&scaleIndex=0&w=1&h=1",
    [ECategory.enchants]:
      "https://web.poecdn.com/image/Art/2DItems/Gems/ClusterBurst.png?scale=1&scaleIn,dex=0&w=1&h=1",
    [ECategory.unique_maps]:
      "https://web.poecdn.com/image/Art/2DItems/Maps/UndeadSiege.png?scale=1&w=1&h=1",
    [ECategory.maps]:
      "https://web.poecdn.com/image/Art/2DItems/Maps/AtlasMaps/Gorge3.png?scale=1&w,=1&h=1",
    [ECategory.unique_jewels]:
      "https://web.poecdn.com/image/Art/2DItems/Jewels/unique7.png?scale=1&w=1&h=1",
    [ECategory.unique_flasks]:
      "https://web.poecdn.com/gen/image/ WzksMTQseyJmIjoiMkRJdGVtc1wvRmxhc2tzXC9UYXN0ZU9mSGF0ZSIsInciOjEsImgiOjIsInNjYWxlIjp0cnVlLCJsZXZlbCI6MX1d/4727ad7a3a/Item.png",
    [ECategory.unique_weapons]:
      "https://web.poecdn.com/image/Art/2DItems/Weapons/OneHandWeapons/OneHandSwords/Varunastra.png?scale=1&w=2&h=3",
    [ECategory.unique_armours]:
      "https://web.poecdn.com/image/Art/2DItems/Armours/Boots/Skyforth.png?scale=1&w=2&h=2",
    [ECategory.unique_accessories]:
      "https://web.poecdn.com/image/Art/2DItems/Amulets/AgateAmuletUnique.png?scale=1&w=1&h=1,",
    [ECategory.beasts]:
      "https://web.poecdn.com/image/Art/2DItems/Currency/BestiaryOrbFull.png?scale=1&w=1&h=1",
    [ECategory.vials]:
      "https://web.poecdn.com/image/Art/2DItems/Currency/VialTemperedFlesh.png?scale=1&w=1&h=1",
    [ECategory.blight_ravaged_maps]:
      "https://web.poecdn.com/gen/image/WzI4LDE0LHsiZiI6IjJESXRlbXMvTWFwcy9BdGxhczJNYXBzL05ldy9GaWVsZHMiLCJ3IjoxLCJoIjoxLCJzY2FsZSI6MSwibW4iOjEyLCJtdCI6MTYsIm11YiI6dHJ1ZX1d/a7ab3884c4/Fields.png",
    [ECategory.blighted_maps]:
      "https://web.poecdn.com/gen/image/WzI4LDE0LHsiZiI6IjJESXRlbXNcL01hcHNcL0F0bGFzMk1hcHNcL05ld1wvTHVuYXJpc1RlbXBsZSIsInciOjEsImgiOjEsInNjYWxlIjp0cnVlLCJtbiI6MTAsIm10IjoxNCwibWIiOnRydWV9XQ/038c28d2e1/Item.png",
    [ECategory.artifacts]:
      "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvRXhwZWRpdGlvbi9HYW1ibGVyUmVmcmVzaEN1cnJlbmN5IiwidyI6MSwiaCI6MSwic2NhbGUiOjF9XQ/f878f8fc1a/GamblerRefreshCurrency.png",
  };

  const formatCategory = (cat: string): string => {
    return cat.split(/(?=[A-Z])/).join(" ");
  };
</script>

<div class="container">
  <LayoutGrid style="margin: 1em 1em;">
    {#each CATEGORIES as category}
      <div class="wrapper">
        <Wrapper>
          <Cell
            style="cursor: pointer;"
            span={1}
            on:click={() => {
              changeCategory(category);
            }}
          >
            <div class="category">
              <div class="img-container">
                <img alt="category" src={icons[category] || ""} />
              </div>
              {formatCategory(category)}
            </div>
          </Cell>
          <Tooltip showDelay={250} hideDelay={1} yPos="above">
            {formatCategory(category)}
          </Tooltip>
        </Wrapper>
      </div>
    {/each}
  </LayoutGrid>
</div>

<style>
  .category {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .img-container {
    display: inline-block;
    vertical-align: middle;
    margin: 0;
    padding: 0;
    height: 32px;
    width: 32px;
  }
  .img-container > img {
    display: block;
    margin: auto;
    max-height: 32px;
  }
  .wrapper {
    padding: 4px;
  }
  .wrapper:hover {
    background-color: #242424;
    border-radius: 4px;
    transition: background-color 0.5s;
  }
</style>

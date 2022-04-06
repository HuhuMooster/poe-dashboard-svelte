<script lang="ts">
  import ListContainer from "@/components/ListContainer.svelte";
  import Loading from "@/components/Loading.svelte";
  import RefreshButton from "@/components/RefreshButton.svelte";
  import { activeLeagues, fetchActiveLeagues } from "@/stores/leagues";
  import { fetchData, ninjaData } from "@/stores/ninja";
  import { ECategory } from "@/stores/ninja/constants";
  import { wait } from "@/util/api";
  import { Label } from "@smui/common";
  import Paper, { Content, Title } from "@smui/paper";
  import { onDestroy, onMount } from "svelte";

  onMount(async () => {
    if (!$activeLeagues) {
      await fetchActiveLeagues();
    }
    if (!$ninjaData.loading) {
      await fetchData({
        leagues: [...$activeLeagues],
        categories: [ECategory.currency],
      });
    }
  });

  onDestroy(() => {
    ninjaData.set({
      ...$ninjaData,
      data: null,
    });
  });

  type TExaltedValues = Record<string, string>;

  const getExaltedValues = (): TExaltedValues => {
    const exaltedVals: TExaltedValues = {};
    for (const league of Object.keys($ninjaData.data)) {
      if ($ninjaData.data[league].Currency.length > 0) {
        exaltedVals[league] = $ninjaData.data[league].Currency.filter(
          (c: any) => c.currencyTypeName === "Exalted Orb"
        )[0]?.chaosEquivalent;
      }
    }
    return exaltedVals;
  };

  $: exaltedValues = !!$ninjaData.data && getExaltedValues();
</script>

<div class="container">
  <Paper elevation={5}>
    <Title style="display:flex;justify-content:space-between;">
      <Label>Exalted prices</Label>
      <RefreshButton
        onClick={async () => {
          ninjaData.set({
            ...$ninjaData,
            loading: true,
            error: "",
          });
          await wait(500);
          await fetchData({
            leagues: [...$activeLeagues],
            categories: [ECategory.currency],
          });
        }}
      />
    </Title>
    <Content>
      {#if $ninjaData.loading}
        <Loading />
      {/if}
      {#if !$ninjaData.loading && $ninjaData.error}
        <Label>{$ninjaData.error}</Label>
      {/if}
      {#if !$ninjaData.loading && !$ninjaData.error && exaltedValues}
        {#each Object.entries(exaltedValues) as [league, value]}
          {#if value}
            <ListContainer>
              <Label>
                1×<img
                  class="exalted"
                  alt="exalted"
                  src="https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyAddModToRare.png"
                />
                = {parseInt(value)}×<img
                  class="chaos"
                  alt="chaos"
                  src="https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyRerollRare.png"
                />
                in {league}
              </Label>
            </ListContainer>
          {/if}
        {/each}
      {/if}
    </Content>
  </Paper>
</div>

<style>
  img {
    max-height: 32px;
    vertical-align: middle;
  }
</style>

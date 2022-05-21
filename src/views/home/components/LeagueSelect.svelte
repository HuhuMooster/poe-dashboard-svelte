<script lang="ts">
  import { defaultLeague, selectedLeague, allLeagues } from "@/stores/leagues";
  import type { TLeague } from "@/stores/leagues/types";
  import Autocomplete from "@smui-extra/autocomplete";
  export let leagueOptions: Partial<TLeague>[] = [];
  export let style: string = "";
  export let callback: () => void = () => {};

  const getDefaultLeagueName = () => {
    const isDefaultLeagueInOptions = leagueOptions.find(
      (l) => l.name === $defaultLeague.name
    )?.name;
    return isDefaultLeagueInOptions ?? $allLeagues.at(-1).name;
  };

  let league = getDefaultLeagueName();
  $: league = leagueOptions.find((l) => l.name === league)?.name;
  $: if (league) {
    selectedLeague.set(
      leagueOptions.find(
        (l) => l.name === leagueOptions.find((l) => l.name === league).name
      )
    );
    setTimeout(() => {
      callback();
    }, 1);
  }
</script>

<div class="container" {style}>
  <Autocomplete
    options={leagueOptions.map((l) => l.name)}
    bind:value={league}
    textfield$variant="outlined"
    label="League"
    style="width: 100vw;max-width: -webkit-fill-available;"
  />
</div>

<style>
  .container {
    margin-top: 32px;
  }
  .container :global(.mdc-deprecated-list-item) {
    height: 32px;
  }
  :global(.mdc-text-field) {
    width: 100vw;
    max-width: -webkit-fill-available;
  }
</style>

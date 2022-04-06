<script lang="ts">
  import { allLeagues, selectedLeague } from "@/stores/leagues";
  import Autocomplete from "@smui-extra/autocomplete";
  let league = $selectedLeague.name;
  $: league && selectedLeague.set($allLeagues.find((l) => l.name === league));
</script>

<div class="container">
  <Autocomplete
    options={$allLeagues.map((l) => l.name)}
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

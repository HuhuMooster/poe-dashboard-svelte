<script lang="ts">
  import LayoutGrid, { Cell } from "@smui/layout-grid";
  import AccountSearch from "./components/AccountSearch.svelte";
  import CharacterSearch from "./components/CharacterSearch.svelte";
  import ExaltedValues from "./components/ExaltedValues.svelte";
  import LeagueInfo from "./components/LeagueInfo.svelte";
</script>

<LayoutGrid style="margin: 1em 1em;">
  <Cell spanDevices={{ desktop: 3, tablet: 4, phone: 4 }}>
    <AccountSearch />
  </Cell>
  <Cell spanDevices={{ desktop: 3, tablet: 4, phone: 4 }}>
    <CharacterSearch />
  </Cell>
  <Cell spanDevices={{ desktop: 3, tablet: 5, phone: 4 }}>
    <LeagueInfo />
  </Cell>
  <Cell spanDevices={{ desktop: 3, tablet: 3, phone: 4 }}>
    <ExaltedValues />
  </Cell>
</LayoutGrid>

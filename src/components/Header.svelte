<script lang="ts">
  import Tab, { Label } from "@smui/tab";
  import TabBar from "@smui/tab-bar";
  import Home from "@/views/home/Home.svelte";
  import Labs from "@/views/lab/Labs.svelte";
  import Transfer from "@/views/transfer/Transfer.svelte";
  import Timeless from "@/views/timeless/Timeless.svelte";
  import Flipper from "@/views/flipper/Flipper.svelte";

  // const tabs = ["Home", "League transfer", "League flipper", "Lab layouts"];
  const tabs = [
    { name: "Home", title: "Path of Exile dashboard", component: Home },
    { name: "Transfer", title: "League transfer", component: Transfer },
    { name: "Flipper", title: "League flipper", component: Flipper },
    { name: "Labyrinth", title: "Lab layouts", component: Labs },
    { name: "Timeless", title: "Timeless helper", component: Timeless },
  ];
  let active = tabs.at(0);
  $: if (active) {
    document.title = active.title;
  }
</script>

<TabBar {tabs} let:tab bind:active>
  <Tab {tab}>
    <Label>{tab.name}</Label>
  </Tab>
</TabBar>

<svelte:component this={active.component} />

<script lang="ts">
  import Tab, { Label } from "@smui/tab";
  import TabBar from "@smui/tab-bar";
  import Home from "@/views/home/Home.svelte";
  import Labs from "@/views/lab/Labs.svelte";
  import Transfer from "@/views/transfer/Transfer.svelte";

  // const tabs = ["Home", "League transfer", "League flipper", "Lab layouts"];
  const tabs = [
    { name: "Home", title: "Path of Exile dashboard", component: Home },
    { name: "Transfer", title: "League transfer", component: Transfer },
    { name: "Flipper", title: "League flipper", component: Labs },
    { name: "Labyrinth", title: "Lab layouts", component: Labs },
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

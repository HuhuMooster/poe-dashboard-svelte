<script lang="ts">
  import { fetchLabLayouts, labLayouts } from "@/stores/labs";
  import { DateTime } from "luxon";
  import { onDestroy, onMount } from "svelte";

  onMount(async () => {
    if (!$labLayouts) {
      await fetchLabLayouts();
    }
  });

  onDestroy(() => {
    cancelCountdowns();
  });

  const cancelCountdowns = () => {
    clearInterval(timer);
    timer = undefined;
  };

  const setCountdown = () => {
    now = DateTime.now().setZone("utc");
  };

  let now = DateTime.now().setZone("utc");
  let timer = setInterval(setCountdown, 1000);

  $: countdown = `${23 - now.hour}h:${59 - now.minute}m:${60 - now.second}s`;
</script>

<div class="container">
  <h1>
    Lab layouts reset in: {countdown}
  </h1>
  {#if !!$labLayouts?.length}
    <div>
      {#each $labLayouts as lab}
        <a href={lab} target="_blank">
          <img src={lab} alt="lab" />
        </a>
      {/each}
    </div>
  {/if}
</div>

<style>
  img {
    width: 100%;
  }
  h1 {
    text-align: center;
  }
</style>

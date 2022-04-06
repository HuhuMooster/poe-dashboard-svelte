<script lang="ts">
  import { mdiRefresh } from "@mdi/js";
  import { Svg } from "@smui/common/elements";
  import IconButton, { Icon } from "@smui/icon-button";

  export let onClick: () => Promise<void> = undefined;
</script>

<div class="container">
  <IconButton on:click={onClick} size="button" ripple={false}>
    <Icon component={Svg} viewBox="0 0 24 24">
      <path fill="currentColor" d={mdiRefresh} />
    </Icon>
  </IconButton>
</div>

<style>
  .container {
    display: flex;
    align-items: center;
    margin: 0;
  }
</style>

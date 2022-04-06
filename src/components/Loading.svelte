<script lang="ts">
  import CircularProgress from "@smui/circular-progress";
  import { Label } from "@smui/common";

  export let circularProgressSize = 64;
  let progressStyle = `height: ${circularProgressSize}px; width: ${circularProgressSize}px;margin: 0 auto;`;
</script>

<div class="progress">
  <CircularProgress style={progressStyle} indeterminate color="blue" />
  <Label style="margin-top: 1em;">Loading...</Label>
</div>

<style>
  .progress {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-self: center;
    text-align: center;
  }
</style>

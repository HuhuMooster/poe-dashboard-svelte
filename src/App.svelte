<script lang="ts">
  import { snackbarComponent, snackbarText } from "@/stores/snackbar";
  import IconButton from "@smui/icon-button";
  import Snackbar, { Actions, Label } from "@smui/snackbar";
  import Header from "./components/Header.svelte";
</script>

<svelte:head>
  <!-- Material Icons -->
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/icon?family=Material+Icons"
  />
  <!-- Roboto -->
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,600,700"
  />
  <!-- Roboto Mono -->
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css?family=Roboto+Mono"
  />
  <!-- SMUI Styles -->
  <link
    rel="stylesheet"
    href="./build/smui-dark.css"
    media="screen and (prefers-color-scheme: dark)"
  />
  <link
    href="https://fonts.googleapis.com/icon?family=Material+Icons"
    rel="stylesheet"
  />
</svelte:head>

<main>
  <Header />
  <Snackbar
    bind:this={$snackbarComponent}
    surface$color="#B71C1C"
    timeoutMs={5000}
  >
    <Label>{$snackbarText}</Label>
    <Actions style="vertical-align: middle;">
      <div class="btn-container">
        <IconButton class="material-icons" title="Dismiss">close</IconButton>
      </div>
    </Actions>
  </Snackbar>
</main>

<style>
  .btn-container :global(.mdc-snackbar__dismiss) {
    padding: 14px;
  }
</style>

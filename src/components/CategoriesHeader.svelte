<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import Tooltip, { Wrapper } from "@smui/tooltip";

  export let icons = null;
  export let categories = null;
  let CATEGORIES = Array.isArray(categories)
    ? [...categories]
    : Object.keys(categories);

  const dispatch = createEventDispatcher();
  const changeCategory = (category: string) => {
    dispatch("changeCategory", category);
  };

  const formatCategory = (cat: string): string => {
    return cat.split(/(?=[A-Z])/).join(" ");
  };
</script>

<div class="container">
  <div class="flexbox">
    {#each CATEGORIES as category}
      <div class="wrapper">
        <Wrapper>
          <div
            class="category"
            on:click={() => {
              changeCategory(category);
            }}
          >
            <div class="img-container">
              <img alt="category" src={icons[category] || ""} />
            </div>
            {formatCategory(category)}
          </div>
          <Tooltip showDelay={250} hideDelay={1} yPos="above">
            {formatCategory(category)}
          </Tooltip>
        </Wrapper>
      </div>
    {/each}
  </div>
</div>

<style>
  .container {
    margin: 0 2em;
    margin-top: 2em;
    margin-bottom: 1em;
  }
  .category {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    cursor: pointer;
    width: 8em;
  }
  .img-container {
    display: inline-block;
    vertical-align: middle;
    margin: 0;
    padding: 0;
    height: 32px;
    width: 32px;
  }
  .flexbox {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .img-container > img {
    display: block;
    margin: auto;
    max-height: 32px;
  }
  .wrapper {
    padding: 4px;
    margin-bottom: 1em;
    margin-right: 0.5em;
  }
  .wrapper:hover {
    background-color: #242424;
    border-radius: 4px;
    transition: background-color 0.5s;
  }
</style>

<script lang="ts">
  import DataTable, {
    Head,
    Body,
    Row,
    Cell,
    Pagination,
    SortValue,
  } from "@smui/data-table";
  import Select, { Option } from "@smui/select";
  import IconButton from "@smui/icon-button";
  import { Label } from "@smui/common";
  import LinearProgress from "@smui/linear-progress";
  import { ninjaData } from "@/stores/ninja";
  import type { Item } from "../types";

  export let items: Item[] = [];
  let sort: keyof Item = "detailsId";
  let sortDirection: Lowercase<keyof typeof SortValue> = "descending";
  let rowsPerPage = 10;
  let currentPage = 0;

  const handleSort = () => {
    items.sort((a, b) => {
      const [aVal, bVal] = [a[sort], b[sort]][
        sortDirection === "ascending" ? "slice" : "reverse"
      ]();
      if (typeof aVal === "string" && typeof bVal === "string") {
        return aVal.localeCompare(bVal);
      }
      return Number(aVal) - Number(bVal);
    });
    items = [...items];
  };

  $: start = currentPage * rowsPerPage;
  $: end = Math.min(start + rowsPerPage, items.length);
  $: slice = items.slice(start, end);
  $: lastPage = Math.max(Math.ceil(items.length / rowsPerPage) - 1, 0);
  $: if (currentPage > lastPage) {
    currentPage = lastPage;
  }
  $: closed = !$ninjaData.loading;
</script>

<div class="container">
  <DataTable
    table$aria-label="Todo list"
    style="width: 100%"
    sortable
    bind:sort
    bind:sortDirection
    on:SMUIDataTable:sorted={handleSort}
  >
    <Head>
      <Row>
        <Cell style="width: 64px" sortable={false} columnId="icon" />
        <Cell columnId="name" l>
          <Label>Name</Label>
          <IconButton class="material-icons">arrow_upward</IconButton>
        </Cell>
        <Cell columnId="leagueCE">
          <Label>
            League
            <img
              class="chaos"
              alt="chaos"
              src="https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyRerollRare.png"
            />
          </Label>
          <IconButton class="material-icons">arrow_upward</IconButton>
        </Cell>
        <Cell columnId="standardCE">
          <Label>
            Standard
            <img
              class="chaos"
              alt="chaos"
              src="https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyRerollRare.png"
            />
          </Label>
          <IconButton class="material-icons">arrow_upward</IconButton>
        </Cell>
        <Cell columnId="profit">
          <Label>
            Profit
            <img
              class="chaos"
              alt="chaos"
              src="https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyRerollRare.png"
            />
          </Label>
          <IconButton class="material-icons">arrow_upward</IconButton>
        </Cell>
        <Cell columnId="profitMargin">
          <Label>Profit Margin %</Label>
          <IconButton class="material-icons">arrow_upward</IconButton>
        </Cell>
      </Row>
    </Head>
    <Body>
      {#each slice as item (item.detailsId)}
        <Row>
          <Cell style="width: 64px">
            <div class="img-container" title={item.explicit}>
              <img alt="category" src={item.icon || ""} />
            </div>
          </Cell>
          <Cell>
            <a
              href={`https://www.poewiki.net/wiki/${encodeURIComponent(
                item.originalName
              )}`}
              target="blank_"
            >
              {item.name}
            </a>
          </Cell>
          <Cell>{item.leagueCE}</Cell>
          <Cell>{item.standardCE}</Cell>
          <Cell>{item.profit}</Cell>
          <Cell>{item.profitMargin}</Cell>
        </Row>
      {/each}
    </Body>

    <LinearProgress
      indeterminate
      bind:closed
      aria-label="Data is being loaded..."
      slot="progress"
    />

    <Pagination slot="paginate">
      <svelte:fragment slot="rowsPerPage">
        <Label>Rows Per Page</Label>
        <Select variant="outlined" bind:value={rowsPerPage} noLabel>
          <Option value={10}>10</Option>
          <Option value={25}>25</Option>
          <Option value={100}>100</Option>
        </Select>
      </svelte:fragment>
      <svelte:fragment slot="total">
        {end ? start + 1 : 0}-{end} of {items.length}
      </svelte:fragment>

      <IconButton
        class="material-icons"
        action="first-page"
        title="First page"
        on:click={() => (currentPage = 0)}
        disabled={currentPage === 0}>first_page</IconButton
      >
      <IconButton
        class="material-icons"
        action="prev-page"
        title="Prev page"
        on:click={() => currentPage--}
        disabled={currentPage === 0}>chevron_left</IconButton
      >
      <IconButton
        class="material-icons"
        action="next-page"
        title="Next page"
        on:click={() => currentPage++}
        disabled={currentPage === lastPage}>chevron_right</IconButton
      >
      <IconButton
        class="material-icons"
        action="last-page"
        title="Last page"
        on:click={() => (currentPage = lastPage)}
        disabled={currentPage === lastPage}>last_page</IconButton
      >
    </Pagination>
  </DataTable>
</div>

<style>
  .container {
    margin: 2em 2em;
    text-align: center;
  }
  .img-container > img {
    display: block;
    margin: auto;
    max-height: 32px;
  }
  img.chaos {
    vertical-align: middle;
    max-height: 32px;
  }
</style>

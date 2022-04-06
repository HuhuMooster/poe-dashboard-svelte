<script lang="ts">
  import ListContainer from "@/components/ListContainer.svelte";
  import Loading from "@/components/Loading.svelte";
  import { defaultLeague } from "@/stores/leagues";
  import { snackbarComponent, snackbarText } from "@/stores/snackbar";
  import {
    getAccountGGG,
    getAccountsPI,
    getHttpClient,
    proxy,
  } from "@/util/api";
  import { Label } from "@smui/common";
  import Paper, { Content, Title } from "@smui/paper";
  import Textfield from "@smui/textfield";
  import CharacterCounter from "@smui/textfield/character-counter";
  import Icon from "@smui/textfield/icon";

  const DISSALLOWED_CHARS = [
    ...new Array(10).fill(null).map((_, i) => i.toString()),
    " ",
  ];

  let characterName: string = "";
  let loading: boolean = false;
  let account: string | null = null;
  let error: string = "";
  $: characterNameLower = characterName.toLocaleLowerCase();
  $: accountInfo = {
    name: `Account: ${account}`,
    links: [
      {
        text: "Profile",
        url: `https://www.pathofexile.com/account/view-profile/${account}/characters`,
      },
      {
        text: "pathofexile.com/trade shop",
        url: `https://www.pathofexile.com/trade/search/${$defaultLeague?.name}?q={"query":{"status":{"option":"any"},"stats":[{"type":"and","filters":[]}],"filters":{"trade_filters":{"disabled":false,"filters":{"account":{"input":"${account}"}}}}},"sort":{"price":"asc"}}`,
      },
      {
        text: "poe.trade shop",
        url: `http://poe.trade/search?league=${$defaultLeague?.name}&seller=${account}&online=`,
      },
    ],
  };
  const findAccount = async (event) => {
    if (!event.target.value) {
      loading = false;
      error = "";
      account = null;
    }
    if (event.key !== "Enter") {
      return;
    }

    if (!characterNameLower) {
      return;
    }

    loading = true;
    error = "";
    account = "";

    try {
      const resp = await getHttpClient().get(
        proxy(getAccountGGG(characterNameLower))
      );
      if ("error" in resp) {
        throw new Error("Not a 2xx response");
      }
      const json = resp.data;
      if (!("error" in json)) {
        account = json.accountName;
      }
    } catch (err) {
      try {
        const resp = await getHttpClient().get(
          getAccountsPI(characterNameLower)
        );
        error = !resp.data.length
          ? "Profile is set to private or doesn't exist."
          : "";
        account = resp.data.length > 0 ? resp.data.at(-1) : null;
      } catch (err) {
        error = "API error.";
      }
    } finally {
      if (error) {
        snackbarText.set(error);
        $snackbarComponent.open();
      }
      loading = false;
    }
  };
  const MAX_INPUT_LENGTH = 23;
</script>

<div class="container">
  <Paper elevation={3}>
    <Title>Find the account</Title>
    <Content style="margin: 2em 0;">
      <Textfield
        label="Character name"
        variant="outlined"
        autocomplete="off"
        style="width: 100%;"
        input$maxlength={MAX_INPUT_LENGTH}
        bind:value={characterName}
        on:keyup={findAccount}
      >
        <Icon class="material-icons" slot="trailingIcon">search</Icon>
        <CharacterCounter slot="helper">
          0 / {MAX_INPUT_LENGTH}
        </CharacterCounter>
      </Textfield>
    </Content>
    {#if account !== null}
      <Paper elevation={5} style="margin-top: 2em;">
        <Content>
          {#if !loading && !error}
            <Label style="width: 100%;overflow-wrap: break-word;">
              {accountInfo.name}
            </Label>
            <br />
            <br />
            {#each accountInfo.links as link}
              <ListContainer>
                <a href={link.url} target="_blank">{link.text}</a>
              </ListContainer>
            {/each}
          {/if}
          {#if loading}
            <Loading />
          {/if}
        </Content>
      </Paper>
    {/if}
  </Paper>
</div>

<style>
  .container {
    width: 100%;
    height: "max-content";
  }
</style>

<script lang="ts">
  import Loading from "@/components/Loading.svelte";
  import { snackbarComponent, snackbarText } from "@/stores/snackbar";
  import {
    getAccountGGG,
    getCharactersPI,
    getHttpClient,
    proxy,
  } from "@/util/api";
  import { Label } from "@smui/common";
  import Paper, { Content, Title } from "@smui/paper";
  import Textfield from "@smui/textfield";
  import CharacterCounter from "@smui/textfield/character-counter";
  import Icon from "@smui/textfield/icon";
  import ListContainer from "@/components/ListContainer.svelte";

  const MAX_INPUT_LENGTH = 100;

  let accountName: string = "";
  let loading: boolean = false;
  let chars: string[] = null;
  let error: string = "";
  let isProfilePrivate = null;
  $: accountNameLower = accountName.toLocaleLowerCase();

  const getCharacterLink = (account: string, character: string): string =>
    `https://www.pathofexile.com/account/view-profile/${account}/characters?characterName=${character}`;

  const checkIsPrivate = async (character: string): Promise<boolean> => {
    try {
      await getHttpClient().get(proxy(getAccountGGG(character)));
      return false;
    } catch (err) {
      return true;
    }
  };

  const findCharacters = async (event) => {
    if (!event.target.value) {
      loading = false;
      error = "";
      chars = null;
      isProfilePrivate = null;
    }
    if (event.key !== "Enter") {
      return;
    }

    if (!accountNameLower) {
      return;
    }

    loading = true;
    error = "";
    chars = [];
    isProfilePrivate = null;

    try {
      const resp = await getHttpClient().get(getCharactersPI(accountNameLower));
      error = !resp.data.length ? "No characters found." : "";
      chars = resp.data.length
        ? [...resp.data].sort((a: string, b: string) =>
            a.localeCompare(b, undefined, { sensitivity: "base" })
          )
        : null;
      if (!error) {
        const lastChar = [...resp.data].at(-1);
        isProfilePrivate = await checkIsPrivate(lastChar);
      }
    } catch (err) {
      error = "API error.";
    } finally {
      if (error) {
        snackbarText.set(error);
        $snackbarComponent.open();
      }
      loading = false;
    }
  };
</script>

<div class="container">
  <!-- <Paper elevation={3} style="margin-top: 1em;"> -->
  <Paper elevation={3}>
    <Title>Find characters</Title>
    <Content style="margin: 2em 0;">
      <Textfield
        label="Account name"
        variant="outlined"
        autocomplete="off"
        style="width: 100%"
        input$maxlength={MAX_INPUT_LENGTH}
        bind:value={accountName}
        on:keyup={findCharacters}
      >
        <Icon class="material-icons" slot="trailingIcon">search</Icon>
        <CharacterCounter slot="helper">
          0 / {MAX_INPUT_LENGTH}
        </CharacterCounter>
      </Textfield>
    </Content>
    {#if chars}
      <Paper elevation={5} style="margin-top: 2em;">
        <Content>
          {#if loading && isProfilePrivate === null}
            <Loading />
          {/if}
          {#if !loading && !error && isProfilePrivate !== null}
            {#each chars as char}
              {#if isProfilePrivate}
                <ListContainer>
                  <Label style="width: 100%;overflow-wrap: break-word;">
                    {char}
                  </Label>
                </ListContainer>
              {:else}
                <ListContainer>
                  <a
                    href={getCharacterLink(accountNameLower, char)}
                    target="_blank"
                  >
                    <Label style="width: 100%;overflow-wrap: break-word;">
                      {char}
                    </Label>
                  </a>
                </ListContainer>
              {/if}
            {/each}
          {/if}
        </Content>
      </Paper>
    {/if}
  </Paper>
</div>

<style>
  .container {
    width: 100%;
    height: max-content;
  }

  a {
    text-decoration: none;
  }
</style>

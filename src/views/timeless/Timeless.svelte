<script lang="ts">
  import Textfield from "@smui/textfield";
  import Checkbox from "@smui/checkbox";
  import FormField from "@smui/form-field";
  import Tooltip, { Wrapper } from "@smui/tooltip";
  import Paper, { Content, Title } from "@smui/paper";
  import LeagueSelect from "@/views/home/components/LeagueSelect.svelte";
  import {
    activeLeagues,
    defaultLeague,
    selectedLeague,
  } from "@/stores/leagues";
  import { onDestroy, onMount } from "svelte";
  import { TJewel, EJewels } from "./constants";

  let jewels: Record<EJewels, TJewel> = {
    [EJewels.brutalRestraint]: {
      name: EJewels.brutalRestraint,
      icon: "https://gamepedia.cursecdn.com/pathofexile_gamepedia/6/6d/Brutal_Restraint_inventory_icon.png",
      text: "",
      constraints: {
        min: 500,
        max: 8000,
      },
      variations: {
        asenath: false,
        balbala: false,
        nasima: false,
        deshret: false,
      },
    },
    [EJewels.elegantHubris]: {
      name: EJewels.elegantHubris,
      icon: "https://gamepedia.cursecdn.com/pathofexile_gamepedia/7/75/Elegant_Hubris_inventory_icon.png",
      text: "",
      constraints: {
        min: 2000,
        max: 160000,
        divisibleByTen: true,
      },
      variations: {
        cadiro: false,
        caspiro: false,
        chitus: false,
        victario: false,
      },
    },
    [EJewels.gloriousVanity]: {
      name: EJewels.gloriousVanity,
      icon: "https://gamepedia.cursecdn.com/pathofexile_gamepedia/9/91/Glorious_Vanity_inventory_icon.png",
      text: "",
      constraints: {
        min: 100,
        max: 8000,
      },
      variations: {
        ahuana: false,
        doryani: false,
        xibaqua: false,
        zerphi: false,
      },
    },
    [EJewels.lethalPride]: {
      name: EJewels.lethalPride,
      icon: "https://gamepedia.cursecdn.com/pathofexile_gamepedia/b/b8/Lethal_Pride_inventory_icon.png",
      text: "",
      constraints: {
        min: 10000,
        max: 18000,
      },
      variations: {
        akoya: false,
        kaom: false,
        kiloava: false,
        rakiata: false,
      },
    },
    [EJewels.militantFaith]: {
      name: EJewels.militantFaith,
      icon: "https://gamepedia.cursecdn.com/pathofexile_gamepedia/d/da/Militant_Faith_inventory_icon.png",
      text: "",
      constraints: {
        min: 2000,
        max: 10000,
      },
      variations: {
        avarius: false,
        dominus: false,
        venarius: false,
        maxarius: false,
      },
    },
  };

  let url = "";

  onMount(() => {
    if (JSON.parse(localStorage.getItem("jewels"))) {
      jewels = JSON.parse(localStorage.getItem("jewels"));
    }
  });

  onDestroy(() => {
    selectedLeague.set($defaultLeague);
    localStorage.setItem("jewels", JSON.stringify(jewels));
  });

  const isSeedValid = (type: EJewels, seed: number): boolean => {
    const jewel = jewels[type];
    if (!seed) {
      return false;
    }

    if (jewel.constraints.divisibleByTen && seed % 10 != 0) {
      return false;
    }

    if (seed > jewel.constraints.max || seed < jewel.constraints.min) {
      return false;
    }

    return true;
  };

  const sortAndValidate = () => {
    const newJewels = { ...jewels };
    for (const jewel of Object.keys(jewels)) {
      newJewels[jewel] = {
        ...jewels[jewel],
        text: jewels[jewel].text
          .split(",")
          .map((seed: string) => parseInt(seed))
          .filter((seed: number) => seed && isSeedValid(jewel as EJewels, seed))
          .sort((a: number, b: number) => a - b)
          .join(","),
      };
    }
    jewels = { ...newJewels };
  };

  const generateLinks = () => {
    sortAndValidate();
    const anyJewelSeeds = Object.values(jewels).some(({ text }) => !!text);

    const gggStats = [];
    for (const jewel of Object.values(jewels)) {
      for (const seedString of jewel.text.split(",")) {
        const seed = parseInt(seedString, 10);
        if (!seed) continue;
        for (const name in jewel.variations) {
          const checked = jewel.variations[name];
          gggStats.push(
            `{"id":"explicit.pseudo_timeless_jewel_${name}","value":{"max":${seed},"min":${seed}},"disabled":${!checked}}`
          );
        }
      }
    }
    url = !anyJewelSeeds
      ? ""
      : `https://www.pathofexile.com/trade/search/${
          $selectedLeague.name
        }?q={"query":{"status":{"option":"any"},"type":"Timeless Jewel","stats":[{"type":"count","filters":[${gggStats.join(
          ","
        )}],"value":{"min":1},"disabled":false}]},"sort":{"price":"asc"}}`;
    if (
      anyJewelSeeds &&
      JSON.stringify(jewels) !==
        JSON.stringify(JSON.parse(localStorage.getItem("jewels")))
    ) {
      localStorage.setItem("jewels", JSON.stringify(jewels));
    }
  };
  $: jewels && generateLinks();
</script>

<div class="container">
  <LeagueSelect
    leagueOptions={$activeLeagues}
    style="margin-bottom: 2em;"
    callback={generateLinks}
  />
  {#each Object.entries(jewels) as [jewelName, jewel]}
    <div class="jewels">
      <div class="jewels-container">
        <Wrapper>
          <img src={jewel.icon} alt="jewel" />
          <Tooltip showDelay={250} hideDelay={1} yPos="above">
            {`Min: ${jewel.constraints.min} Max: ${jewel.constraints.max} ${
              jewel.constraints.divisibleByTen ? "Divisible by 10" : ""
            }`}
          </Tooltip>
        </Wrapper>
        <Textfield
          label={jewel.name}
          variant="outlined"
          autocomplete="off"
          style="width: inherit;"
          bind:value={jewel.text}
          on:blur={sortAndValidate}
        />
      </div>
      <div class="variations">
        {#each Object.keys(jewel.variations) as variationName}
          <div class="checkbox-container">
            <FormField>
              <Checkbox
                color={"secondary"}
                label={variationName}
                checked={jewel.variations[variationName]}
                on:change={(event) => {
                  const newJewel = jewels[jewelName];
                  const newJewels = {
                    ...jewels,
                    [jewelName]: {
                      ...newJewel,
                      variations: {
                        ...newJewel.variations,
                        [variationName]: !newJewel.variations[variationName],
                      },
                    },
                  };
                  jewels = { ...newJewels };
                }}
              />
              <span slot="label">
                {variationName.charAt(0).toUpperCase() +
                  variationName.substring(1)}
              </span>
            </FormField>
          </div>
        {/each}
      </div>
    </div>
  {/each}
  {#if url}
    <div style="width:25%;margin:0 auto;">
      <Paper elevation={5} style="margin-top: 2em;">
        <Title>Search URL</Title>
        <Content>
          <a href={url} target="_blank">https://www.pathofexile.com/trade</a>
        </Content>
      </Paper>
    </div>
  {/if}
</div>

<style>
  .container {
    margin: 2em;
  }
  .jewels {
    display: flex;
    flex-direction: row;
    vertical-align: middle;
    align-items: center;
    padding-top: 1em;
    padding-bottom: 1em;
  }
  img {
    height: 32px;
    padding-right: 1em;
    cursor: help;
  }
  .jewels-container {
    display: flex;
    flex-direction: row;
    vertical-align: middle;
    align-items: center;
    width: 100%;
  }
  .variations {
    display: flex;
    flex-direction: row;
    vertical-align: middle;
    align-items: center;
    justify-content: flex-start;
    width: 60%;
  }
  .checkbox-container {
    margin-left: 1em;
  }
</style>

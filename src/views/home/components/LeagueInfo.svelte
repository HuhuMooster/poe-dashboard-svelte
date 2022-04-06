<script lang="ts">
  import ListContainer from "@/components/ListContainer.svelte";
  import Loading from "@/components/Loading.svelte";
  import { fetchAllLeagues, selectedLeague } from "@/stores/leagues";
  import LeagueSelect from "@/views/home/components/LeagueSelect.svelte";
  import { Label } from "@smui/common";
  import Paper, { Content, Title } from "@smui/paper";
  import { DateTime } from "luxon";
  import { onDestroy, onMount } from "svelte";

  const TIME_ZONE: string = Intl.DateTimeFormat()
    .resolvedOptions()
    .timeZone.replace("_", " ");

  onMount(async () => {
    if (!$selectedLeague) {
      await fetchAllLeagues();
    }
  });

  onDestroy(() => {
    cancelCountdowns();
  });

  const formatTime = (millis: number): string => {
    let secs = Math.floor(millis / 1000);
    let mins = Math.floor(secs / 60);
    secs %= 60;
    let hours = Math.floor(mins / 60);
    mins %= 60;
    const days = Math.floor(hours / 24);
    hours %= 24;

    let timeFmt = "";
    timeFmt += days
      ? `${days} day${days > 1 ? "s" : ""}${hours || mins || secs ? ", " : ""}`
      : "";
    timeFmt += hours
      ? `${hours} hour${hours > 1 ? "s" : ""}${mins || secs ? ", " : ""}`
      : "";
    timeFmt += mins
      ? `${mins} minute${mins > 1 ? "s" : ""}${secs ? ", " : ""}`
      : "";
    timeFmt += secs ? `${secs} second${secs > 1 ? "s" : ""}` : "";

    return timeFmt;
  };

  const cancelCountdowns = () => {
    clearInterval(startTimer);
    startTimer = undefined;
    clearInterval(endTimer);
    endTimer = undefined;
  };

  const getDuration = (): string => {
    const start = DateTime.fromISO($selectedLeague.start);
    const end = DateTime.fromISO($selectedLeague.end);
    const duration = Math.floor(end.diff(start, "days").days);
    return `Duration: ${duration} days`;
  };

  const setStartCountdown = (): void => {
    if (!$selectedLeague) {
      startCountdown = "";
      return;
    }
    const start = DateTime.fromISO($selectedLeague.start);
    const now = DateTime.now();
    const diff = now.diff(start, "milliseconds").milliseconds;

    startCountdown = `${diff > 0 ? "Started" : "Starts in"} ${formatTime(
      Math.abs(diff)
    )}${diff > 0 ? " ago" : ""}`;
  };

  const setEndCountdown = (): void => {
    if (!$selectedLeague?.end) {
      endCountdown = "";
      return;
    }
    const end = DateTime.fromISO($selectedLeague.end);
    const now = DateTime.now();
    const diff = end.diff(now, "milliseconds").milliseconds;

    endCountdown = `${diff > 0 ? "Ends in" : "Ended"} ${formatTime(
      Math.abs(diff)
    )}${diff > 0 ? "" : " ago"}`;
  };

  let startCountdown = undefined;
  let endCountdown = undefined;
  let endTimer = setInterval(setStartCountdown, 1000);
  let startTimer = setInterval(setEndCountdown, 1000);

  $: start =
    $selectedLeague?.start &&
    `Start ${DateTime.fromISO($selectedLeague.start).toFormat(
      "dd.MM.yyyy HH:mm"
    )} ${TIME_ZONE}`;

  $: end =
    $selectedLeague?.end &&
    `End \u00a0\u00a0${DateTime.fromISO($selectedLeague.end).toFormat(
      "dd.MM.yyyy HH:mm"
    )} ${TIME_ZONE}`;
  $: duration = $selectedLeague?.start && $selectedLeague?.end && getDuration();
  $: if ($selectedLeague) {
    setStartCountdown();
    setEndCountdown();
  }
  $: leagueInfo = [start, end, startCountdown, endCountdown, duration];
</script>

<div class="container">
  <Paper elevation={5}>
    <Title>League info</Title>
    <Content>
      {#if !$selectedLeague || startCountdown === undefined || !endCountdown === undefined}
        <Loading />
      {:else}
        <LeagueSelect />
        <br />
        {#each leagueInfo as row}
          {#if row}
            <ListContainer>
              <Label style="width: 100%;overflow-wrap: break-word;">
                {row}
              </Label>
            </ListContainer>
          {/if}
        {/each}
      {/if}
    </Content>
  </Paper>
</div>

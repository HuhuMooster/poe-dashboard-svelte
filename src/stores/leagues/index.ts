import { getHttpClient, proxy } from '@/util/api';
import { writable } from 'svelte/store';
import type { TLeague } from './types';

export const activeLeagues = writable<Partial<TLeague>[]>(undefined);
export const allLeagues = writable<TLeague[]>(undefined)
export const defaultLeague = writable<Partial<TLeague>>(undefined)
export const selectedLeague = writable<Partial<TLeague>>(undefined)

export const fetchAllLeagues: () => Promise<void> = async () => {
  try {
    const res = await getHttpClient().get(
      "http://timelessjewels.ddns.net:3000/leagues"
    );
    const challengeLeague = res.data.find((league: TLeague) => league.challenge && (league.active || league.upcoming))
    const standardLeague = res.data.at(-1)
    allLeagues.set(res.data)
    defaultLeague.set(challengeLeague || standardLeague)
    selectedLeague.set(challengeLeague || standardLeague)
  } catch (err) {
    allLeagues.set(undefined)
    defaultLeague.set(undefined)
    selectedLeague.set(undefined)
  }
}

export const fetchActiveLeagues: () => Promise<void> = async () => {
  try {
    const res = await getHttpClient().get(
      proxy("https://api.poe.watch/leagues")
    );
    const data = res.data.map((l: {
      name: string,
      start_date: string,
      end_date: string,
    }) => { return { name: l.name } });
    activeLeagues.set(data);
  } catch (err) {
    activeLeagues.set(undefined)
  }
}

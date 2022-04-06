import { getHttpClient, proxy } from '@/util/api';
import { writable } from 'svelte/store';
import type { TLeague } from './types';

export const activeLeagues = writable<string[]>(undefined);
export const allLeagues = writable<TLeague[]>(undefined)
export const defaultLeague = writable<TLeague>(undefined)
export const selectedLeague = writable<TLeague>(undefined)

export const fetchAllLeagues: () => Promise<void> = async () => {
  try {
    const res = await getHttpClient().get(
      "https://api.jsonbin.io/b/5ffd721b8aa7af359da900b8/latest"
    );
    const challengeLeague = res.data.at(0)
    allLeagues.set(res.data)
    defaultLeague.set(challengeLeague)
    selectedLeague.set(challengeLeague)
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
    }) => l.name);
    activeLeagues.set(data);
  } catch (err) {
    activeLeagues.set(undefined)
  }
}

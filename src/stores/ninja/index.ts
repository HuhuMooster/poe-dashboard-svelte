import { activeLeagues } from "@/stores/leagues";
import { getHttpClient, proxy } from "@/util/api";
import { get, writable } from 'svelte/store';
import { CATEGORIES, ECategory, INITIAL_NINJA_DATA_STATE } from './constants';
import type { TIcons, TNinjaData } from './types';


export const ninjaData = writable<TNinjaData>(JSON.parse(JSON.stringify(INITIAL_NINJA_DATA_STATE)))

const currentLeagues = get(activeLeagues);
const currentNinjaData = get(ninjaData)

const getOverview = (category: ECategory, league: string): string => `https://poe.ninja/api/data/${[ECategory.currency, ECategory.fragments].includes(category) ? 'currency' : 'item'}overview?league=${league}&type=${category}`

export const fetchData = async ({ leagues, categories }: { leagues?: string[], categories?: ECategory[] }): Promise<void> => {
  const activeLeagues = !leagues ? currentLeagues : [...leagues]
  const actveCategories = !categories ? CATEGORIES : [...categories]
  const icons: TIcons = {}
  const data: any = {}
  const requestsToProcess = {}

  ninjaData.set({
    ...currentNinjaData,
    loading: true,
    error: '',
  })

  for (const l of activeLeagues) {
    data[l] = {}
    requestsToProcess[l] = {}
    for (const c of actveCategories) {
      requestsToProcess[l][c] = getHttpClient().get(proxy(getOverview(c, l)))
    }
    let entries: any[] = null
    try {
      entries = await Promise.all(Object.values(requestsToProcess[l]))
    } catch (err) {
      ninjaData.set({
        // ...JSON.parse(JSON.stringify(INITIAL_NINJA_DATA_STATE)),
        ...currentNinjaData,
        loading: false,
        error: "API error.",
      })
      return
    }
    for (const entry of entries) {
      const category = entry.config.url.split('&type=')[1]
      data[l][category] = entry.data.lines

      if ('currencyDetails' in entry.data) {
        for (const currency of entry.data.currencyDetails) {
          icons[currency.name] = currency.icon
        }
      } else {
        for (const item of entry.data.lines) {
          icons[item.name] = item.name in icons ? item.icon : icons[item.name]
        }
      }
    }
  }
  ninjaData.set({
    data: { ...currentNinjaData.data, ...data },
    icons: { ...currentNinjaData.icons, ...icons },
    loading: false,
    error: '',
  })
}

import { getHttpClient } from "@/util/api";
import { writable } from 'svelte/store';

export const labLayouts = writable<string[]>(undefined)

export const fetchLabLayouts = async (): Promise<void> => {
  try {
    const labsAPI = 'http://timelessjewels.ddns.net:3000/labs'
    const resp = await getHttpClient().get(labsAPI)
    const layouts = resp.data
    labLayouts.set(layouts)

  } catch (err) {
    labLayouts.set(undefined)
  }
}
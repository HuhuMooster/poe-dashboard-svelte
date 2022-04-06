import { writable } from "svelte/store";
import type { SnackbarComponentDev } from "@smui/snackbar";

export const snackbarComponent = writable<SnackbarComponentDev>(undefined)
export const snackbarText = writable<string>('')

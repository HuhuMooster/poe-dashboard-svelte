import axios, { AxiosStatic } from 'axios'

export const proxy = (url: string): string => `https://soft-glitter-3b2c.orangelumpywaspkapow.workers.dev/?${url}`
export const getHttpClient: () => AxiosStatic = () => axios
export const getCharactersPI = (account: string): string => `http://timelessjewels.ddns.net:3000/characters?account=${account}`;
export const getAccountsPI = (character: string): string => `http://timelessjewels.ddns.net:3000/accounts?character=${character}`;
export const getAccountGGG = (character: string): string => `https://www.pathofexile.com/character-window/get-account-name-by-character?character=${character}`;

export const wait = async (milliseconds: number = 1000): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, milliseconds)
  })
}
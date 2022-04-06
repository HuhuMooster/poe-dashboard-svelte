export const getProfit = (buyFor: number, sellFor: number) => {
  return parseFloat((buyFor - sellFor).toFixed(2))
}

export const getProfitMargin = (buyFor: number, sellFor: number) => {
  return parseInt((((buyFor / sellFor) - 1) * 100).toString(), 10)
}
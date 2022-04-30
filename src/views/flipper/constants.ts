import { ECategory } from "@/stores/ninja/constants";

export enum EFlipperCategory {
  betrayal = 'Betrayal',
  breach = 'Breach',
  divinationCards = 'Divination Cards',
  incursion = 'Incursion',
  guardians = 'Guardians',
}

export const CATEGORIES: Record<EFlipperCategory, ECategory[]> = {
  [EFlipperCategory.betrayal]: [ECategory.fragments],
  [EFlipperCategory.breach]: [
    ECategory.currency,
    ECategory.unique_accessories,
    ECategory.unique_armours,
    ECategory.unique_weapons,
    ECategory.unique_jewels,
  ],
  [EFlipperCategory.divinationCards]: [
    ECategory.currency,
    ECategory.cards,
    ECategory.fragments,
    ECategory.maps,
    ECategory.gems,
    ECategory.unique_maps,
    ECategory.unique_flasks,
    ECategory.unique_accessories,
    ECategory.unique_armours,
    ECategory.unique_weapons,
    ECategory.unique_jewels,
  ],
  [EFlipperCategory.incursion]: [
    ECategory.vials,
    ECategory.unique_accessories,
    ECategory.unique_armours,
    ECategory.unique_weapons,
    ECategory.unique_jewels,
    ECategory.unique_flasks,
  ],
  [EFlipperCategory.guardians]: [ECategory.fragments, ECategory.maps, ECategory.invitations],
};

export const ICONS = {
  [EFlipperCategory.betrayal]: "https://web.poecdn.com/image/Art/2DItems/Currency/Breach/ChayulasPureBreachstone.png?v=ae4f5b702ba54c8b380ba3fcad6871a0&w=1&h=1&scale=1",
  [EFlipperCategory.breach]: "https://web.poecdn.com/image/Art/2DItems/Currency/Breach/BreachUpgraderChaos.png?v=841360bbd5f81619761a0d16f8c36793&w=1&h=1&scale=1",
  [EFlipperCategory.divinationCards]: "https://web.poecdn.com/image/Art/2DItems/Divination/InventoryIcon.png?v=a8ae131b97fad3c64de0e6d9f250d743&w=1&h=1&scale=1",
  [EFlipperCategory.incursion]: "https://web.poecdn.com/image/Art/2DItems/Currency/VialSoulCatcher.png?v=dd5e81208051ef78212c78ab9d333cfe&w=1&h=1&scale=1",
  [EFlipperCategory.guardians]: "https://web.poecdn.com/gen/image/WzI4LDE0LHsiZiI6IjJESXRlbXNcL01hcHNcL0F0bGFzMk1hcHNcL05ld1wvUGhvZW5peCIsInciOjEsImgiOjEsInNjYWxlIjp0cnVlLCJtbiI6MTAsIm10IjowLCJtaSI6MX1d/f1a8145429/Item.png",
};
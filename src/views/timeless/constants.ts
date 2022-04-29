export type TJewel = {
  name: EJewels;
  icon: string;
  text: string;
  variations: Record<string, boolean>;
  constraints: {
    min: number;
    max: number;
    divisibleByTen?: boolean;
  };
};

export enum EJewels {
  brutalRestraint = "Brutal Restraint",
  elegantHubris = "Elegant Hubris",
  gloriousVanity = "Glorious Vanity",
  lethalPride = "Lethal Pride",
  militantFaith = "Militant Faith",
}
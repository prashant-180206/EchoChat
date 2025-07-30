import { defaultConfig } from "@tamagui/config/v4";
import { createTamagui } from "tamagui";
import { themes as customThemes } from "./assets/theme";

export const tamaguiConfig = createTamagui({
  ...defaultConfig,
  themes: {
    ...defaultConfig.themes,
    ...customThemes,
  },
});

export default tamaguiConfig;

export type Conf = typeof tamaguiConfig;

declare module "tamagui" {
  interface TamaguiCustomConfig extends Conf {}
}

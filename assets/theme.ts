import { createThemes, defaultComponentThemes } from "@tamagui/theme-builder";
import * as Colors from "@tamagui/colors";

const darkPalette = [
  "hsla(204, 91%, 1%, 1)",
  "hsla(205, 91%, 8%, 1)",
  "hsla(207, 91%, 14%, 1)",
  "hsla(208, 91%, 21%, 1)",
  "hsla(210, 91%, 27%, 1)",
  "hsla(211, 91%, 34%, 1)",
  "hsla(213, 91%, 40%, 1)",
  "hsla(214, 91%, 47%, 1)",
  "hsla(216, 91%, 53%, 1)",
  "hsla(217, 91%, 60%, 1)",
  "hsla(0, 15%, 93%, 1)",
  "hsla(0, 15%, 99%, 1)",
];
const lightPalette = [
  "hsla(204, 91%, 94%, 1)",
  "hsla(205, 91%, 86%, 1)",
  "hsla(207, 91%, 79%, 1)",
  "hsla(208, 91%, 72%, 1)",
  "hsla(210, 91%, 64%, 1)",
  "hsla(211, 91%, 57%, 1)",
  "hsla(213, 91%, 49%, 1)",
  "hsla(214, 91%, 42%, 1)",
  "hsla(216, 91%, 34%, 1)",
  "hsla(217, 91%, 27%, 1)",
  "hsla(0, 15%, 15%, 1)",
  "hsla(0, 15%, 1%, 1)",
];

const lightShadows = {
  shadow1: "rgba(0,0,0,0.04)",
  shadow2: "rgba(0,0,0,0.08)",
  shadow3: "rgba(0,0,0,0.16)",
  shadow4: "rgba(0,0,0,0.24)",
  shadow5: "rgba(0,0,0,0.32)",
  shadow6: "rgba(0,0,0,0.4)",
};

const darkShadows = {
  shadow1: "rgba(0,0,0,0.2)",
  shadow2: "rgba(0,0,0,0.3)",
  shadow3: "rgba(0,0,0,0.4)",
  shadow4: "rgba(0,0,0,0.5)",
  shadow5: "rgba(0,0,0,0.6)",
  shadow6: "rgba(0,0,0,0.7)",
};

// we're adding some example sub-themes for you to show how they are done, "success" "warning", "error":

const builtThemes = createThemes({
  componentThemes: defaultComponentThemes,

  base: {
    palette: {
      dark: darkPalette,
      light: lightPalette,
    },

    extra: {
      light: {
        color: "",
        ...Colors.green,
        ...Colors.red,
        ...Colors.yellow,
        ...lightShadows,
        shadowColor: lightShadows.shadow1,
      },
      dark: {
        ...Colors.greenDark,
        ...Colors.redDark,
        ...Colors.yellowDark,
        ...darkShadows,
        shadowColor: darkShadows.shadow1,
      },
    },
  },

  accent: {
    palette: {
      dark: [
        "hsla(173, 80%, 26%, 1)",
        "hsla(154, 71%, 24%, 1)",
        "hsla(135, 63%, 21%, 1)",
        "hsla(116, 54%, 18%, 1)",
        "hsla(96, 45%, 15%, 1)",
        "hsla(77, 36%, 12%, 1)",
        "hsla(58, 27%, 9%, 1)",
        "hsla(39, 18%, 6%, 1)",
        "hsla(19, 9%, 3%, 1)",
        "hsla(0, 0%, 0%, 1)",
        "hsla(250, 50%, 90%, 1)",
        "hsla(250, 50%, 95%, 1)",
      ],
      light: [
        "hsla(173, 80%, 80%, 1)",
        "hsla(173, 80%, 75%, 1)",
        "hsla(173, 80%, 71%, 1)",
        "hsla(173, 80%, 67%, 1)",
        "hsla(173, 80%, 62%, 1)",
        "hsla(173, 80%, 58%, 1)",
        "hsla(173, 80%, 53%, 1)",
        "hsla(173, 80%, 49%, 1)",
        "hsla(173, 80%, 44%, 1)",
        "hsla(173, 80%, 40%, 1)",
        "hsla(250, 50%, 95%, 1)",
        "hsla(250, 50%, 95%, 1)",
      ],
    },
  },

  childrenThemes: {
    warning: {
      palette: {
        dark: Object.values(Colors.yellowDark),
        light: Object.values(Colors.yellow),
      },
    },

    error: {
      palette: {
        dark: Object.values(Colors.redDark),
        light: Object.values(Colors.red),
      },
    },

    success: {
      palette: {
        dark: Object.values(Colors.greenDark),
        light: Object.values(Colors.green),
      },
    },
  },

  // optionally add more, can pass palette or template

  // grandChildrenThemes: {
  //   alt1: {
  //     template: 'alt1',
  //   },
  //   alt2: {
  //     template: 'alt2',
  //   },
  //   surface1: {
  //     template: 'surface1',
  //   },
  //   surface2: {
  //     template: 'surface2',
  //   },
  //   surface3: {
  //     template: 'surface3',
  //   },
  // },
});

export type Themes = typeof builtThemes;

// the process.env conditional here is optional but saves web client-side bundle
// size by leaving out themes JS. tamagui automatically hydrates themes from CSS
// back into JS for you, and the bundler plugins set TAMAGUI_ENVIRONMENT. so
// long as you are using the Vite, Next, Webpack plugins this should just work,
// but if not you can just export builtThemes directly as themes:
export const themes: Themes =
  process.env.TAMAGUI_ENVIRONMENT === "client" &&
  process.env.NODE_ENV === "production"
    ? ({} as any)
    : (builtThemes as any);

import { DefaultTheme } from "styled-components";

const colors = {
  // primary: "#0086E5",
  // f85a40, 7552cc, 00c16e, 0cb9c1, 037ef3 #A6D1FA
  primary: "#037ef3",
  secondary: "#C9E5FF",
  tertiary: "#FFD166",
  black: "#000000",
  gray: "#e5e5e5",
  white: "#ffffff",
  red: "#FF5555",
};

export type ColorProps = typeof colors;

export const theme: DefaultTheme = {
  colors,
};

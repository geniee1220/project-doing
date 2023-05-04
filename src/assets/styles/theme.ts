import { DefaultTheme } from "styled-components";

const colors = {
  primary: "#0086E5",
  secondary: "#01C1C6",
  tertiary: "#FFD166",
  black: "#000000",
  white: "#ffffff",
  red: "#FF5555",
};

export type ColorProps = typeof colors;

export const theme: DefaultTheme = {
  colors,
};

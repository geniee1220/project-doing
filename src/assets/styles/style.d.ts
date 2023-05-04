import "styled-components";
import { ColorProps } from "./theme";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: ColorProps;
  }
}

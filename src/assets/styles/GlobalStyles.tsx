import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    :root {
        --header-height: 70px;
        --footer-height: 140px;
    }

  *,
  *::after,
  *::before {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  html,
  body {
    @supports (-webkit-touch-callout: none) {
      height: -webkit-fill-available;
    }

    *::-webkit-scrollbar {
      display: none;
    }
  }

  html {
    font-size: 62.5%;
  }

  body {
    position: relative;
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 1.6rem;

    a {
        color:inherit;
        text-decoration: none;
    }
  }
`;

export default GlobalStyles;

import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    --background: #003A70;
    
    --white: #FFFFFF;
    --yellow: #FFCB05;
    --black: #000000;

    --pokemon-color-red: #EC8484;
    --pokemon-color-blue: #94DBEE;
    --pokemon-color-yellow: #FFFF99;
    --pokemon-color-green: #64D364;
    --pokemon-color-black: #BBBBBB;
    --pokemon-color-brown: #CC9966;
    --pokemon-color-purple: #C183C1;
    --pokemon-color-gray: #D1D1E0;
    --pokemon-color-white: #FFFFFF;
    --pokemon-color-pink: #F4BDC9;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 62.5%;
  }

  body {
    background: var(--background);
    color: var(--white);
  }

  body, input, textarea, button {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
  }

  html, body {
    width: 100%;
    height: 100%;
  }
`;

import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 62.5%;
  }

  body {
    font-family: 'Manrope', sans-serif;
    font-weight: 800;
    background-color: ${(props) => props.theme.bodyBgColor};
  }
`;

export default GlobalStyle;

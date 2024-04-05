import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    :root, html, body {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
        border: 0;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
        'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
        sans-serif !important;
        background-color: #f7f7f7;
        overflow-x: hidden;
        list-style-type: none;
        max-width: 100vw;
    }

    input {
        outline: none;
    }
`;

export { GlobalStyle };

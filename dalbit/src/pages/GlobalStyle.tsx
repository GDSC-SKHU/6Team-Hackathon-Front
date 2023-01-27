import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

 *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
 }
 
 html{
   min-height: 100vh;
 }

 @font-face {
    font-family: 'HSGooltokki';
    src: url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400&display=swap');
    font-weight: normal;
    font-style: normal;
}
 body{   
    font-family: 'Noto Sans KR', sans-serif;
    min-height: 100vh;
 }
`;

export default GlobalStyle;

// console.log("Hello, Webpack from busitora + TS!");

//   const log = (message: number): void => {
//     console.log(message)
//   }

// const text_log: (message: string) => void = message => {
//     // void = message っていうのが意味わからん
//     console.log(message)
//   }

// log(11)
// text_log('Hello, Webpack + TypeScript!')

// // void は 何も返却されないという意味

import * as React from "react";
import { render } from "react-dom";
import styled from "styled-components";

 const Header = styled.h1`
   color: red;
 `;

 const Main = <Header>Markdown Editor</Header>;
render(Main, document.getElementById("app"));

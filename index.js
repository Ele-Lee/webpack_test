import { styled } from "@linaria/react";
// import styled from "style-component";
// const h = "20px";
// line-height: ${h};
export const Container = styled.div`
  width: 375px;
  font-size: 23px;
  border: 1px solid red;

  &:hover {
    border-color: blue;
  }
`;

// const sleep = (t) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve();
//     }, t);
//   });`
// };

// async function fun() {
//   await sleep(100);
//   console.log(1);
// }
// fun();
// // exports.fun = fun;

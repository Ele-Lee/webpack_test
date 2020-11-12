import { styled } from "@linaria/react";
export const Container = styled.div`
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

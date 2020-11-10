/******/ (() => { // webpackBootstrap
const sleep = t => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, t);
  });
};

async function fun() {
  try {
    await sleep(100);
  } catch (e) {
    console.error(e);
  }

  console.log(1);
}

fun(); // exports.fun = fun;
/******/ })()
;
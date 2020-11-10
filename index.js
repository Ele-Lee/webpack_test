const sleep = (t) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, t);
  });
};

async function fun() {
  await sleep(100);
  console.log(1);
}
fun();
// exports.fun = fun;

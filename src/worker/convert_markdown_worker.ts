import * as marked from "marked";

const worker: Worker = self as any;
// 通常の JavaScript であれば、self というグローバル変数でアクセスできる。
// しかし TypeScript だと型定義の兼ね合いで self にアクセスできないと判定されてビルドができない。
// そこで self as any と書くことで型チェックを回避

worker.addEventListener("message", (event) => {
  console.log("Worker Received:", event.data);
  const text = event.data;
  const html = marked(text);
  worker.postMessage({ html });
});

//   let count: number = 1;
//   while (count < 1_000_000_000) {
//     // ここに書いてるのでメインスレッドでは動かず重くならない
//     count++;
//   }

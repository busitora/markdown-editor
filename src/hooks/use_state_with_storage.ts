import { useState } from "react";

// const [値, 値をセットする関数] = useState<扱う状態の型>(初期値)

export const useStateWithStorage = (
  // カスタムフックは use から始める慣例
  init: string, // init: string は初期値で、useState の引数と同じ
  key: string // key: string は localStorage に保存する際のキー
): [string, (s: string) => void] => {
  // [string, (s: string) => void] はカスタムフックの戻り値で、useState の戻り値と同じ型
  const [value, setValue] = useState<string>(localStorage.getItem(key) || init);
  // useState の呼び出しと同じで localStorage の値を取得しつつ、取得できない場合は引数の初期値

  const setValueWithStorage = (nextValue: string): void => {
    setValue(nextValue);
    // console.log(nextValue);
    localStorage.setItem(key, nextValue);
    console.log(value);
    // useState から取得した関数と localStorage への保存を組み合わせた関数を生成
  };

  return [value, setValueWithStorage];
  // 最後に useState から取得した値と localStorage への保存を組み合わせた更新関数を返却
};

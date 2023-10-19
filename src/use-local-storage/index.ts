// custom hook
// react hooklarına benzer görev yapan
// ama kendi oluşturuduğumuz hooklar
//veri ve veriyi değiştirecek fonksiyon döndürürler

import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
  // state tanımlarız ve ilk değerini localstorageden alır
  const [value, setValue] = useState<T>(() => {
    // localden saklanan değerleri al
    const jsonValue = localStorage.getItem(key);

    if (jsonValue === null) {
      // localde eleman yoksa başlangıç değerini belirle
      if (typeof initialValue === "function") {
        // eğer başlangıç değri fonksiyonsa sonucu kullanır
        return (initialValue as () => T)();
      } else {
        // eğer fonksiyon değilse değeri direkt kullanırız
        return initialValue;
      }
    } else {
      return JSON.parse(jsonValue);
    }
  });
  // useEffect kullanarak value her değiştiğinde locale kaydeder
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  //bileşenlere döndürülücek değer ve fonksiyon belirleme
  return [value, setValue] as [T, typeof setValue];
}

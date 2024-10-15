import { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <>
      <button onClick={() => setCount((c) => c + 1)}>-</button>
      {count}
      <button onClick={() => setCount((c) => c - 1)}>+</button>
    </>
  );
}

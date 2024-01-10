import { useEffect } from "react";
import React, { useState } from "react";

const TextView = React.memo(({ text }) => {
  useEffect(() => {
    console.log(`${text} update`);
  });
  return <div>{text}</div>;
});

const CountView = React.memo(({ count }) => {
  useEffect(() => {
    console.log(`${count} update`);
  });
  return <div>{count}</div>;
});

const OptimizeTest = () => {
  // Reactmemo 실습을 위해 만든 컴포넌트입니다.
  const [count, setCount] = useState(1);
  const [text, setText] = useState("");

  return (
    <div style={{ padding: 50 }}>
      <div>
        <h2>count</h2>
        <CountView count={count} />
        <button
          onClick={() => {
            setCount(count + 1);
          }}
        >
          +
        </button>
      </div>
      <div>
        <h2>text</h2>
        <TextView text={text} />
        <input value={text} onChange={(e) => setText(e.target.value)} />
      </div>
    </div>
  );
};

export default OptimizeTest;

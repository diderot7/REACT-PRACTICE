import { useEffect } from "react";
import React, { useState } from "react";

const CountA = React.memo(({ count }) => {
  useEffect(() => {
    console.log(`${count} A update `);
  });
  return <div>{count} </div>;
});

const CountB = ({ obj }) => {
  useEffect(() => {
    console.log(`${obj.count} B update `);
  });
  // 객체를 비교할때는 얕은 비교를 하기 떄문에 업데이트가 됌
  // 객체는 값이 아닌 주소에 의한 비교 (얕은 비교)
  return <div>{obj.count}</div>;
};

const areEqual = (prevProps, nextProps) => {
  // if (prevProps.obj.count === nextProps.obj.count) {
  //   return true;
  // }
  // return false;

  return prevProps.obj.count === nextProps.obj.count;

  // true 이전 props와 현재 props가 같다 => 리렌더 x
  // false 이전 props와 현재 props가 다르다 => 리렌더 o
};
const MemoizedCounterB = React.memo(CountB, areEqual);

const OptimizeTest2 = () => {
  // Reactmemo 실습을 위해 만든 컴포넌트입니다.
  const [count, setCount] = useState(1);
  const [obj, setObj] = useState({
    count: 1,
  });

  return (
    <div style={{ padding: 50 }}>
      <div>
        <h2>Count A</h2>
        <CountA count={count} />
        <button onClick={() => setCount(count)}>A button</button>
      </div>
      <div>
        <h2>Count B</h2>
        {/* <CountB obj={obj} /> */}
        <MemoizedCounterB obj={obj} />

        <button
          onClick={() =>
            setObj({
              count: obj.count,
            })
          }
        >
          B button
        </button>
      </div>
    </div>
  );
};

export default OptimizeTest2;

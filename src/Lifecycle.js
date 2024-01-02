import { useEffect, useState } from "react";

const UnmountTest = () => {
  useEffect(() => {
    console.log("mount");
    return () => {
      console.log("unmount");
    };
  }, []);

  return <div>unmount test</div>;
};

const Lifecycle = () => {
  const [isVisible, setISVisible] = useState(false);
  const toggle = () => setISVisible(!isVisible);

  return (
    <div style={{ padding: 20 }}>
      <button onClick={toggle}>ON/OFF</button>
      {isVisible && <UnmountTest />}
    </div>
  );
};

export default Lifecycle;

// import { useEffect, useState } from "react";

// const Lifecycle = () => {
//   const [count, setCount] = useState(0);
//   const [text, setText] = useState("");

//   useEffect(() => {
//     console.log("Mount");
//   }, []);

//   useEffect(() => {
//     console.log("update");
//   });

//   useEffect(() => {
//     console.log(`count is update : ${count}`);
//     if (count > 5) {
//       alert("count가 5를 넘었습니다. 1로 초기화 합니다.");
//       setCount(1);
//     }
//   }, [count]);

//   useEffect(() => {
//     console.log(`text is update : ${text}`);
//   }, [text]);

//   return (
//     <div style={{ padding: 20 }}>
//       <div>
//         {count}
//         <button
//           onClick={() => {
//             setCount(count + 1);
//           }}
//         >
//           +
//         </button>
//       </div>
//       <div>
//         <input
//           value={text}
//           onChange={(e) => {
//             setText(e.target.value);
//           }}
//         />
//       </div>
//     </div>
//   );
// };

// export default Lifecycle;

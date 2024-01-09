import { useRef, useState, useEffect } from "react";

import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
// import Lifecycle from "./Lifecycle";
import Login from "./Login";
import Logout from "./Logout";
import Title from "./Title";

//https://jsonplaceholder.typicode.com/comments

const App = () => {
  const [data, setData] = useState([]);
  // const dummyList = [
  //   {
  //     id: 1,
  //     author: "이정환",
  //     content: "하이1",
  //     emotion: 5,
  //     created_date: new Date().getTime(),
  //   },
  //   {
  //     id: 2,
  //     author: "이정환",
  //     content: "하이2",
  //     emotion: 5,
  //     created_date: new Date().getTime(),
  //   },
  //   {
  //     id: 3,
  //     author: "이정환",
  //     content: "하이3",
  //     emotion: 5,
  //     created_date: new Date().getTime(),
  //   },
  // ];

  // 로그인 구현
  const [isLogin, setIsLogin] = useState(false);
  const toggleIsLogin = () => setIsLogin(!isLogin);
  const memberData = JSON.parse(localStorage.getItem("loginInfo"));

  const OnLogin = (loginObj) => {
    // 로그인을 했을 때 만약 똑같은 아이디가 있다면 data에 값을 넣는거지.

    localStorage.setItem("loginInfo", JSON.stringify(loginObj));

    toggleIsLogin();
  };
  console.log(data);
  // const memberData = JSON.parse(localStorage.getItem("loginInfo"));
  useEffect(() => {
    const LoginInfo = JSON.parse(localStorage.getItem("loginInfo"));

    if (LoginInfo) {
      toggleIsLogin();
    }
  }, []);
  const onLogout = () => {
    localStorage.removeItem("loginInfo");

    toggleIsLogin();
  };

  // const getData = async () => {
  //   const res = await fetch(
  //     "https://jsonplaceholder.typicode.com/comments"
  //   ).then((res) => res.json());

  //   const initData = res.slice(0, 20).map((it) => {
  //     return {
  //       author: it.email,
  //       content: it.body,
  //       emotion: Math.floor(Math.random() * 5) + 1,
  //       created_date: new Date().getTime(),
  //       id: dataId.current++,
  //     };
  //   });

  //   setData(initData);
  // };
  // useEffect(() => {
  //   getData();
  // }, []);

  // console.log(data);
  const dataId = useRef(1);
  const onCreate = (content, emotion) => {
    const create_date = new Date().getTime();
    const name = memberData.id;
    const newItem = {
      Nickname: name,
      content,
      emotion,
      create_date,
      id: dataId.current,
    };
    dataId.current += 1;

    setData([newItem, ...data]);
    const dataArray = JSON.parse(localStorage.getItem("loginInfo")) || [];
    dataArray.content.push(newItem);
    console.log(dataArray);
    localStorage.setItem("loginInfo", JSON.stringify(dataArray));
  };
  const onDelete = (targetId) => {
    let filterDiary = data.filter((it) => it.id !== targetId);
    setData(filterDiary);
  };

  const onEdit = (targetId, newContent) => {
    setData(
      data.map((it) =>
        it.id === targetId ? { ...it, content: newContent } : it
      )
    );
  };

  return (
    <div className="App">
      <Title />

      {isLogin && (
        <>
          <Login onLogout={onLogout} memberData={memberData} />
          <DiaryEditor onCreate={onCreate} />
          <DiaryList data={data} onDelete={onDelete} onEdit={onEdit} />
        </>
      )}
      {!isLogin && <Logout OnLogin={OnLogin} />}
    </div>
  );
};

export default App;

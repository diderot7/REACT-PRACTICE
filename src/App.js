import { useRef, useState, useEffect } from "react";

import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
// import Lifecycle from "./Lifecycle";
import Login from "./Login";
import Logout from "./Logout";
import Title from "./Title";

const App = () => {
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
  const [isLogin, setIsLogin] = useState(false);
  const toggleIsLogin = () => setIsLogin(!isLogin);

  const OnLogin = (loginObj) => {
    localStorage.setItem("loginInfo", JSON.stringify(loginObj));
    // const LoginInfo = JSON.parse(localStorage.getItem("loginInfo"));
    toggleIsLogin();
  };
  let LoginInfostring = JSON.parse(localStorage.getItem("loginInfo"));

  // const LoginId = LoginInfos["id"] ? LoginInfos["id"] : undefined;

  // console.log(LoginInfos["id"]);

  useEffect(() => {
    const LoginInfo = JSON.parse(localStorage.getItem("loginInfo"));

    if (LoginInfo) {
      toggleIsLogin();
    }
  }, []);
  // const LoginJungbo = () => {
  // const LoginInfo = JSON.parse(localStorage.getItem("loginInfo"));
  //   return LoginInfo.id;
  // };

  // console.log(LoginJungbo());
  // console.log(LoginInfo.id !== "");
  const onLogout = () => {
    localStorage.removeItem("loginInfo");
    // LoginInfo = "";
    // LoginId = "";

    toggleIsLogin();
  };

  // console.log(LoginInfo, LoginId);

  const [data, setData] = useState([]);

  const dataId = useRef(1);
  const onCreate = (author, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id: dataId.current,
    };
    dataId.current += 1;
    setData([newItem, ...data]);
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
      {/* <Lifecycle /> */}
      {isLogin && (
        <Login onLogout={onLogout} LoginInfostring={LoginInfostring} />
      )}
      {!isLogin && <Logout OnLogin={OnLogin} />}
      <DiaryEditor onCreate={onCreate} />
      <DiaryList diaryList={data} onDelete={onDelete} onEdit={onEdit} />
    </div>
  );
};

export default App;

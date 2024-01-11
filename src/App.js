import { useRef, useState, useEffect, useMemo } from "react";

import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
// import Lifecycle from "./Lifecycle";
import Login from "./Login";
import Logout from "./Logout";
import Title from "./Title";

//https://jsonplaceholder.typicode.com/comments

const App = () => {
  const [data, setData] = useState({});
  const [userId, SetUserId] = useState("");
  // 로그인 구현

  const OnLogin = (loginObj) => {
    // 로컬스토리지에 값을 ID 값으로 넣는다.
    // const CompareId = JSON.parse(localStorage.getItem(loginObj.id)).id;
    // 로그인 값이 있으면 그 로그인값의 데이터를 뿌려라
    const LoginId = loginObj.id;
    if (JSON.parse(localStorage.getItem(LoginId))) {
      //(loginObj.id === JSON.parse(localStorage.getItem(loginObj.id)))
      const memberDatas = JSON.parse(localStorage.getItem(LoginId)).contents;
      // memberData컨텐츠가 없으면 빈배열 리턴, 있으면 컨텐츠 리턴
      setData(memberDatas.length >= 1 ? memberDatas : []);
      SetUserId(LoginId);
      toggleIsLogin();

      return;
    }
    // 그게 아니라면 로컬스토리지에 값을 넣어라

    localStorage.setItem(LoginId, JSON.stringify(loginObj));
    SetUserId(LoginId);
    dataId.current = 1;
    toggleIsLogin();
    console.log("실행");
    return;
  };
  console.log(data);
  console.log(userId);
  const [isLogin, setIsLogin] = useState(false);
  const toggleIsLogin = () => {
    setIsLogin(!isLogin);
  };

  // const memberData = JSON.parse(localStorage.getItem("loginInfo"));
  // useEffect(() => {
  //   const LoginInfo = JSON.parse(localStorage.getItem("loginInfo"));

  //   if (LoginInfo) {
  //     toggleIsLogin();
  //   }
  // }, []);
  const onLogout = () => {
    // localStorage.removeItem("loginInfo");

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
    const name = userId;
    const newItem = {
      Nickname: name,
      content,
      emotion,
      create_date,
      id: dataId.current,
    };
    dataId.current += 1;
    const memberDatas = JSON.parse(localStorage.getItem(userId)).contents;

    setData(memberDatas.length > 1 ? [newItem, ...data] : [newItem]);
    const dataArray = JSON.parse(localStorage.getItem(userId)) || [];
    dataArray.contents.push(newItem);
    console.log(dataArray);
    localStorage.setItem(userId, JSON.stringify(dataArray));
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

  // const getDiaryAnalysis = useMemo(() => {
  //   const goodCount = data.filter((it) => it.emotion >= 3).length;
  //   const badCount = data.length - goodCount;
  //   const goodRatio = (goodCount / data.length) * 100;
  //   return { goodCount, badCount, goodRatio };
  // }, [data.length]);
  // usememo는 값을 기억해서 dependency array (위 함수에서는 [data.length]자리)가 변하지 않으면 리랜더 안됌

  // const { goodCount, badCount, goodRatio } = getDiaryAnalysis;
  // 구조분해할당으로 위 getDiaryAnalysis() 이렇게 불러야하지만 useMemo를 쓰면 그 함수는 값이기 떄문에 ()를 붙이지 않는다. 내가 생각할때는 return 콜백함수가 있어서 그렇다. 원래 함수는 undefined값을 가지지만 return값을 가졌기 때문에 ()을 안붙이는듯

  return (
    <div className="App">
      <Title />

      {isLogin && (
        <>
          <Login onLogout={onLogout} />

          <DiaryEditor onCreate={onCreate} />
          {/* <div>전체 일기 : {data.length} </div>
          <div>기분 좋은 일기 개수 : {goodCount} </div>
          <div>기분 나쁜 일기 개수 : {badCount} </div>
          <div>기분 좋은 일기 비율 : {goodRatio}</div> */}
          <DiaryList data={data} onDelete={onDelete} onEdit={onEdit} />
        </>
      )}
      {!isLogin && <Logout OnLogin={OnLogin} />}
    </div>
  );
};

export default App;

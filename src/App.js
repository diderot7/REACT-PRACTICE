import React, {
  useRef,
  useEffect,
  useMemo,
  useCallback,
  useReducer,
  useState,
} from "react";

import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
import Login from "./Login";
import Logout from "./Logout";
import Title from "./Title";

const reducer = (state, action) => {
  console.log(state, action);
  switch (action.type) {
    case "OnLogin": {
      // localstorage 데이터가 1이상이면 push,
      // 그게 아니라면 그냥 값 전다
      const { id, password } = action.data;
      const LoginData = JSON.parse(localStorage.getItem("id"));
      // 로그인 vlaue값 추가
      if (!LoginData) {
        localStorage.setItem("id", JSON.stringify([action.data]));
        const FirstData = JSON.parse(localStorage.getItem("id"));
        return {
          datainfo: [],
          userId: id,
        };
        // localstorage값이 비어져있을때 처음 값 입력
      }
      // localstorage에 값이 있는 상태
      else if (LoginData) {
        let LoginFilterData = LoginData.filter((it) => it.id === id);
        // 같은 값이면 데이터가 한개라도 있을거고
        // 같은 값이 없으면 로그인데이터가 한개라도 없을거다.

        if (LoginFilterData.length !== 0) {
          // localStorage에 같은 값이 있는 상태
          let LoginFilterDataFirstObj = LoginFilterData.shift();
          if (LoginFilterDataFirstObj.password === password) {
            return {
              datainfo: LoginFilterDataFirstObj ? LoginFilterDataFirstObj : [],
              userId: id,
            };
          } else {
            alert("비밀번호가 틀렸습니다.");
            return state;
          }
        } else if (LoginFilterData.length === 0) {
          // localStorage에 같은 값이 없는 상태
          LoginData.unshift(action.data);
          localStorage.removeItem("id");
          localStorage.setItem("id", JSON.stringify(LoginData));
          return {
            datainfo: [],
            userId: id,
          };
        }
      }
    }
    // 로그인 구현 완료

    case "CREATE": {
      const created_date = new Date().getTime();
      const Nickname = state.userId;
      const newItem = {
        ...action.data,
        created_date,
        Nickname,
      };
      let dataArray = JSON.parse(localStorage.getItem("id")); // 로컬스토리지에서 모든 값 가져오고
      let LoginFilterData = dataArray.filter((it) => it.id === state.userId);

      // const dataInfo = data.datainfo;
      // const dataInfoContent = dataInfo.contents || [];

      LoginFilterData[0].contents.push(newItem);
      const ObjLoginFilterData = LoginFilterData[0];

      // const key1Values = array.map(obj => obj.key1);

      // 거기에 값을 넣고
      dataArray = dataArray.filter((it) => it.id !== state.userId);

      // 로그인내에 기존에 있던 값을 삭제하고

      dataArray.unshift(ObjLoginFilterData);
      localStorage.setItem("id", JSON.stringify(dataArray));

      return {
        userId: state.userId,
        datainfo: LoginFilterData,
      };
    }
    case "Delete": {
      const dataArr = state.datainfo;
      const dataArrContents = dataArr[0].contents;
      const newFilterData = dataArrContents.filter(
        (it) => it.id !== action.targetId
      );
      const LoginData = JSON.parse(localStorage.getItem("id"));
      LoginData[0].contents = newFilterData;
      console.log(newFilterData, LoginData);
      return {
        userId: state.userId,
        datainfo: LoginData,
      };
    }
    case "EDIT": {
      const dataArr = state.datainfo;
      const dataArrContents = dataArr[0].contents;
      const newEditData = dataArrContents.map((it) =>
        it.id === action.targetId
          ? {
              ...it,
              content: action.newContent,
            }
          : it
      );
      const LoginData = JSON.parse(localStorage.getItem("id"));
      LoginData[0].contents = newEditData;

      return {
        userId: state.userId,
        datainfo: LoginData,
      };
    }
    case "InfoUse": {
      const { FirstData, FirstId } = action.data;
      return {
        userId: FirstId,
        datainfo: [FirstData],
      };
    }
    default:
      return state;
  }
};

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

const App = () => {
  const [data, dispatch] = useReducer(reducer, {
    datainfo: [],
    userId: "",
  });

  const [isLogin, setIsLogin] = useState(false);
  // 로그인 구현
  useEffect(() => {
    if (localStorage.getItem("id")) {
      const Data = JSON.parse(localStorage.getItem("id"));
      const FirstData = Data[0];
      const FirstId = FirstData.id;
      setIsLogin(true);
      dispatch({ type: "InfoUse", data: { FirstData, FirstId } });
    }
  }, []);
  const OnLogin = (loginObj) => {
    dispatch({ type: "OnLogin", data: loginObj });
    setIsLogin(!isLogin);
  };

  const onLogout = () => {
    setIsLogin(false);
  };

  const dataId = useRef(1);
  const onCreate = useCallback((content, emotion) => {
    dispatch({
      type: "CREATE",
      data: { content, emotion, id: dataId.current },
    });
    dataId.current += 1;
  }, []);

  const onDelete = useCallback((targetId) => {
    dispatch({ type: "Delete", targetId });
  }, []);

  const onEdit = useCallback((targetId, newContent, Nickname) => {
    dispatch({
      type: "EDIT",
      targetId,
      newContent,
      Nickname,
    });
  }, []);

  const memoizedDispatches = useMemo(() => {
    return { onCreate, onDelete, onEdit, onLogout, OnLogin };
  }, []);

  // const getDiaryAnalysis = useMemo(() => {
  //   if (!data.datainfo) {
  //     return null;
  //   }
  //   const goodCount = data.datainfo.contents.filter(
  //     (it) => it.emotion >= 3
  //   ).length;
  //   const badCount = data.datainfo.contents.length - goodCount;
  //   const goodRatio = (goodCount / data.datainfo.contents.length) * 100;
  //   return { goodCount, badCount, goodRatio };
  // }, [data.datainfo]);

  // const { goodCount, badCount, goodRatio } = getDiaryAnalysis || {};

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={memoizedDispatches}>
        <div className="App">
          <Title />
          {isLogin && (
            <>
              <Login />
              <DiaryEditor />
              {/* <div>전체 일기 : {data.datainfo.length} </div>
              <div>기분 좋은 일기 개수 : {goodCount} </div>
              <div>기분 나쁜 일기 개수 : {badCount} </div>
              <div>기분 좋은 일기 비율 : {goodRatio || 0}</div> */}
              <DiaryList />
            </>
          )}
          {!isLogin && <Logout />}
        </div>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
};

export default App;

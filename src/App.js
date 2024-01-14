import React, {
  useRef,
  useEffect,
  useMemo,
  useCallback,
  useReducer,
} from "react";

import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
import Login from "./Login";
import Logout from "./Logout";
import Title from "./Title";

const reducer = (state, action) => {
  switch (action.type) {
    case "OnLogin": {
      const { id, password } = action.data;
      console.log(id, password);
      const LoginData = JSON.parse(localStorage.getItem(id));
      if (LoginData) {
        if (LoginData.password === password) {
          const memberDatas = LoginData.contents;
          return {
            ...state,
            datainfo: memberDatas ? memberDatas : [],
            userId: id,
            isLogin: true,
          };
        } else {
          alert("비밀번호가 틀렸습니다.");
          return state;
        }
      }

      localStorage.setItem(id, JSON.stringify(action.data));
      return {
        ...state,
        userId: id,
        dataId: 1,
        isLogin: !state.isLogin,
      };
    }

    case "CREATE": {
      const created_date = new Date().getTime();
      const Nickname = state.userId;
      const newItem = {
        ...action.data,
        created_date,
        Nickname,
      };
      const dataArray = JSON.parse(localStorage.getItem(state.userId)) || [];
      dataArray.contents.push(newItem);
      localStorage.setItem(state.userId, JSON.stringify(dataArray));
      return {
        ...state,
        datainfo: [newItem, ...state.datainfo],
      };
    }
    case "Delete": {
      return {
        ...state,
        datainfo: state.datainfo.filter((it) => it.id !== action.targetId),
      };
    }
    case "EDIT": {
      return {
        ...state,
        datainfo: state.datainfo.map((it) =>
          it.id === action.targetId
            ? {
                ...it,
                content: action.newContent,
              }
            : it
        ),
      };
    }
    case "IdInfo": {
      return {
        ...state,
        datainfo: action.data,
      };
    }
    case "toggleLogin": {
      return {
        ...state,
        isLogin: !state.isLogin,
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
    isLogin: false,
  });
  console.log(data);

  // 로그인 구현

  const OnLogin = (loginObj) => {
    dispatch({ type: "OnLogin", data: loginObj });
  };

  useEffect(() => {
    const IdInfo = JSON.parse(localStorage.getItem(data.userId));
    console.log(IdInfo);
    if (IdInfo !== null) {
      dispatch({ type: "IdInfo", data: IdInfo.contents });
    }
  }, [dispatch]);

  const onLogout = () => {
    dispatch({ type: "toggleLogin" });
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

  const onEdit = useCallback((targetId, newContent) => {
    dispatch({
      type: "EDIT",
      targetId,
      newContent,
    });
  }, []);

  const memoizedDispatches = useMemo(() => {
    return { onCreate, onDelete, onEdit, onLogout, OnLogin };
  }, []);

  const getDiaryAnalysis = useMemo(() => {
    if (!data.datainfo) {
      return null;
    }
    const goodCount = data.datainfo.filter((it) => it.emotion >= 3).length;
    const badCount = data.datainfo.length - goodCount;
    const goodRatio = (goodCount / data.datainfo.length) * 100;
    return { goodCount, badCount, goodRatio };
  }, [data.datainfo]);

  const { goodCount, badCount, goodRatio } = getDiaryAnalysis || {};

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={memoizedDispatches}>
        <div className="App">
          <Title />
          {data.isLogin && (
            <>
              <Login />

              <DiaryEditor />
              <div>전체 일기 : {data.datainfo.length} </div>
              <div>기분 좋은 일기 개수 : {goodCount} </div>
              <div>기분 나쁜 일기 개수 : {badCount} </div>
              <div>기분 좋은 일기 비율 : {goodRatio || 0}</div>
              <DiaryList />
            </>
          )}
          {!data.isLogin && <Logout />}
        </div>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
};

export default App;

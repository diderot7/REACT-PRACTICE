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
  console.log(state, action);
  switch (action.type) {
    case "OnLogin": {
      // localstorage 데이터가 1이상이면 push,
      // 그게 아니라면 그냥 값 전다
      const { id, password } = action.data;
      const LoginData = JSON.parse(localStorage.getItem("id"));
      console.log(LoginData);
      // 로그인 vlaue값 추가
      if (!LoginData) {
        localStorage.setItem("id", JSON.stringify([action.data]));
        return {
          datainfo: [],
          userId: id,
          isLogin: true,
        };
        // localstorage값이 비어져있을때 처음 값 입력
      }
      // localstorage에 값이 있는 상태
      else if (LoginData) {
        let LoginFilterData = LoginData.filter((it) => it.id === id);
        // 같은 값이면 데이터가 한개라도 있을거고
        // 같은 값이 없으면 로그인데이터가 한개라도 없을거다.
        console.log(id, password, LoginFilterData[0].password);

        if (LoginFilterData.length !== 0) {
          // localStorage에 같은 값이 있는 상태
          let LoginFilterDataFirstObj = LoginFilterData.shift();
          if (LoginFilterDataFirstObj.password === password) {
            return {
              datainfo: LoginFilterDataFirstObj ? LoginFilterDataFirstObj : [],
              userId: id,
              isLogin: true,
            };
          } else {
            alert("비밀번호가 틀렸습니다.");
            return state;
          }
        } else if (LoginFilterData.length === 0) {
          // localStorage에 같은 값이 없는 상태
          LoginData.push(action.data);
          localStorage.removeItem("id");
          localStorage.setItem("id", JSON.stringify(LoginData));
        }
      }

      // if (LoginData) {
      //

      //   if (LoginFilterData.id === id) {
      //     if (LoginFilterData.password === password) {
      //       const memberDatas = LoginFilterData.contents;
      //       return {
      //         datainfo: memberDatas ? memberDatas : [],
      //         userId: id,
      //         isLogin: true,
      //       };
      //     } else {
      //       alert("비밀번호가 틀렸습니다.");
      //       return state;
      //     }
      //   }
      // }

      // [{ id: "tt", password: "xx", contents: Array(1) }]; // localstorage구조
      return {
        datainfo: [],
        userId: id,
        isLogin: true,
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
      let dataArray = JSON.parse(localStorage.getItem("id"));
      let LoginFilterData = dataArray.filter((it) => it.id === Nickname);
      console.log(LoginFilterData);
      //로그인 아이디랑 같은 값을 들고와서
      LoginFilterData[0].contents.push(newItem);
      // 거기에 값을 넣고
      dataArray = dataArray.filter((it) => it.id !== state.id);
      // 로그인내에 기존에 있던 값을 삭제하고
      dataArray.push(LoginFilterData);

      localStorage.setItem("id", JSON.stringify(dataArray));

      return {
        ...state,
        datainfo: LoginFilterData,
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
        isLogin: true,
      };
    }
    case "toggleLogin": {
      return {
        ...state,
        isLogin: !state.isLogin,
      };
    }

    // default:
    //   return state;
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
  // const user = useMemo(() => {
  //   return { ...data };
  // }, [data.datainfo]);
  const OnLogin = (loginObj) => {
    dispatch({ type: "OnLogin", data: loginObj });
  };
  // const getIdate = JSON.parse(localStorage.getItem(data));
  // console.log(data);
  // useEffect(() => {
  //   if (data) {
  //     dispatch({ type: "IdInfo" });
  //     console.log("실행");
  //   }
  // }, []);

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
          {data.isLogin && (
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
          {!data.isLogin && <Logout />}
        </div>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
};

export default App;

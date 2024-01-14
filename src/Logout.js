import React, { useContext, useState } from "react";
import { DiaryDispatchContext } from "./App";

const Logout = () => {
  const { OnLogin } = useContext(DiaryDispatchContext);

  const [state, setState] = useState({
    id: "",
    password: "",
    contents: [],
  });
  const handleChangeLogin = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const LoginSubmit = () => {
    // 비밀번호 영어로만 입력 가능 구현
    const EnglishPattern = /^[a-zA-Z]+$/;
    if (EnglishPattern.test(state.password) === false) {
      // 티스토리 기록
      alert("한글, 숫자 금지");
      setState({
        id: "",
        password: "",
        contents: [],
      });
      return;
    }
    OnLogin(state);
  };

  return (
    <div className="Logout">
      <div>
        <input
          placeholder="닉네임"
          name="id"
          value={state.id}
          onChange={handleChangeLogin}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="비밀번호"
          name="password"
          value={state.password}
          onChange={handleChangeLogin}
        />
      </div>
      <button onClick={LoginSubmit}>로그인</button>
    </div>
  );
};

export default Logout;

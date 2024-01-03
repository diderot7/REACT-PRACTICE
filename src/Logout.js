import { useState } from "react";

const Logout = ({ OnLogin }) => {
  const [state, setState] = useState({
    id: "",
    password: "",
  });
  const handleChangeLogin = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const LoginSubmit = () => {
    OnLogin(state);
  };

  return (
    <div>
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

import { useContext } from "react";
import { DiaryDispatchContext } from "./App";
import { DiaryStateContext } from "./App";

const Login = () => {
  const { onLogout } = useContext(DiaryDispatchContext);
  const data = useContext(DiaryStateContext);

  const onLogoutSubmit = () => {
    onLogout();
  };
  return (
    <div>
      <div>
        {data && `${data.userId}님 환영합니다`}
        <button onClick={onLogoutSubmit}>로그아웃</button>
      </div>
    </div>
  );
};

Login.defaultProps = {
  memberData: null,
};
// Login.defaultProps = {
//   LoginJungbo: {},
// };

export default Login;

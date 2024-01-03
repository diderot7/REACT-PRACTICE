const Login = ({ onLogout, LoginInfostring }) => {
  // console.log(LoginInfo);
  const onLogoutSubmit = () => {
    onLogout();
  };
  return (
    <div>
      <div>
        {LoginInfostring && `${LoginInfostring.id}님 환영합니다`}
        <button onClick={onLogoutSubmit}>로그아웃</button>
      </div>
    </div>
  );
};

Login.defaultProps = {
  LoginInfostring: null,
};
// Login.defaultProps = {
//   LoginJungbo: {},
// };

export default Login;

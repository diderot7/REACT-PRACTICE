const Login = ({ onLogout, memberData }) => {
  // console.log(LoginInfo);
  const onLogoutSubmit = () => {
    onLogout();
  };
  return (
    <div>
      <div>
        {memberData && `${memberData.id}님 환영합니다`}
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

import { useContext, useEffect } from "react";
import MyButton from "../components/MyButton";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthContext";

const APILogin = () => {
  const token = localStorage.getItem('token');
  console.log(token);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  console.log(login);
  useEffect(() => {
    if (login) {
      navigate(-1);
    }
  }, [])

  const goEmailLogin = () => {
    navigate(`/loginEmail`);
  };

  const goRegister = () => {
    navigate(`/register`);
  }

  return (
    <div className="api-login">
      <div className="login-img-wrapper">
        {/* <div>멍BTI LOGO</div> */}
        <img src="assets/LOGO.png" alt="MbtiLogo" width="150px" />
        <img
          alt="개"
          src={process.env.PUBLIC_URL + `assets/dog.jpg`}
          width="90%"
        />
      </div>
      <div className="api-btn-wrapper">
        <button className="api-button">구글 계정으로 로그인</button>
        <button className="api-button">카카오 로그인</button>
      </div>
      <div className="btn-wrapper">
        <MyButton text="회원가입" onClick={goRegister}></MyButton>
        <MyButton text="로그인" onClick={goEmailLogin}></MyButton>
      </div>
    </div>
  );
};

export default APILogin;

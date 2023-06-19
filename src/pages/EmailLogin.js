import MyButton from "../components/MyButton";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../components/AuthContext";

const EmailLogin = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const navigate = useNavigate();
  const { login, loginUpdate } = useContext(AuthContext);
  const domain = "http://ec2-3-36-140-165.ap-northeast-2.compute.amazonaws.com/api"

  useEffect(() => {
    if (login) {
      navigate('/main');
    }
  }, [])

  const goForgetPw = () => {
    navigate('/forgetPw');
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // const getNickname = async () => {
  //   const token = localStorage.getItem('token');
  //   const responseNick = await fetch(`${domain}/member/profile`, {
  //     method: 'GET',
  //     headers: {
  //       'Authorization': `Bearer ${token}`
  //     }
  //   })

  //   if (responseNick.ok) {
  //     const result = await responseNick.json();
  //     localStorage.setItem('nickname', result.data.memberNick);
  //   } else {
  //     console.log(responseNick.status);
  //   }
  // }

  const getNickname = () => {
    localStorage.setItem('nickname', 'abc');
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (email && password) {
      const response = await fetch(`${domain}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ memberEmail: email, memberPw: password })
      });

      if (response.ok) {
        const res = await response.json();
        console.log(res.data.accessToken)
        localStorage.setItem('token', res.data.accessToken);
        loginUpdate();
        getNickname();
        navigate('/main');
      } else if (response.status === 401) {
        const err = await response.text();
        alert(err)
      } else alert('로그인 실패');
    } else if (!email) {
      emailInputRef.current.focus();
    } else {
      passwordInputRef.current.focus();
    }
  };

  return (
    <div className="email-login">
      <div className="login-img-wrapper">
        <img src="assets/LOGO.png" alt="MbtiLogo" width="150px" />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="input-box">
          <input
            className="input input-value"
            type="email" value={email} ref={emailInputRef}
            onChange={handleEmailChange}
            placeholder="이메일"
          />
        </div>
        <div className="input-box">
          <input
            className="input input-value"
            type="password" value={password} ref={passwordInputRef}
            onChange={handlePasswordChange}
            placeholder="비밀번호" />
        </div>
        <div className="login-wrapper">
          <MyButton text="로그인" />
          <button className="forget" onClick={goForgetPw}>비밀번호를 잊어버리셨나요?</button>
        </div>
      </form>
    </div>
  );
};

export default EmailLogin;

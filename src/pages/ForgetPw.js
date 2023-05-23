import MyButton from "../components/MyButton";
import { useRef, useState } from "react";

const ForgetPw = () => {

  const [email, setEmail] = useState('');
  const emailInputRef = useRef(null);

  const getPw = () => {
    
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  return (
    <div className="forget-pw">
      <div className="logo-wrapper">
        <img src="assets/LOGO.png" alt="MbtiLogo" width="150px" />
      </div>
      <div className="input-box">
        <input
          className="input input-value"
          type="email" value={email} ref={emailInputRef}
          onChange={handleEmailChange}
          placeholder="이메일"
        />
      </div>
      <div className="btn-wrapper">
        <MyButton text="임시비밀번호 발급" onClick={getPw} />
      </div>
    </div>
  );
};

export default ForgetPw;

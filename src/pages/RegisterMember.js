import { useNavigate } from "react-router-dom";
import MyButton from "../components/MyButton";
import { useState } from "react";

const RegisterMember = () => {
  const navigate = useNavigate();
  const domain = "http://ec2-13-209-35-166.ap-northeast-2.compute.amazonaws.com:8080"

  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [pw1, setPw1] = useState('');
  const [pw2, setPw2] = useState('');
  const [nicknameCheck, setNicknameCheck] = useState(false);
  const [pw1Check, setPw1Check] = useState(false);
  const [pw2Check, setPw2Check] = useState(false);
  const [defaultCheck, setDefaultCheck] = useState({
    nickname: false,
    pw1Check: false,
    pw2Check: false
  })

  const changeNickname = (e) => {
    setNickname(e.target.value);
    setDefaultCheck(prev => ({
      ...prev,
      nickname: false
    }));
  }

  const checkNickname = async (event) => {
    event.preventDefault();

    if(nickname) {
      const response = await fetch(`${domain}/member/checkNickname`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nickname })
      })

      if (response.ok) {
        setDefaultCheck(prev => ({
          ...prev,
          nickname: true
        }));
        setNicknameCheck(true);
      } else {
        setDefaultCheck(prev => ({
          ...prev,
          nickname: true
        }));
        setNicknameCheck(false);
      }
    } else {
      alert("닉네임을 입력해주세요");
    }
  }

  // 비밀번호 유효성 검사
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/;

    if (!passwordRegex.test(password)) {
      setPw1Check(false);
    } else {
      setPw1Check(true);
    }
    setDefaultCheck(prev => ({
      ...prev,
      pw1Check: true
    }));
  };

  const changePw1 = (e) => {
    setPw1(e.target.value);
    setDefaultCheck(prev => ({
      ...prev,
      pw1Check: false,
      pw2Check: false,
    }));
  }

  const changePw2 = (e) => {
    setPw2(e.target.value);
    if (pw1 === e.target.value) {
      setPw2Check(true);
    } else {
      setPw2Check(false);
    }
    setDefaultCheck(prev => ({
      ...prev,
      pw2Check: true
    }))
  }

  const blurPw2 = (e) => {
    if (pw1 === e.target.value) {
      setPw2Check(true);
    } else {
      setPw2Check(false);
    }
    setDefaultCheck(prev => ({
      ...prev,
      pw2Check: true
    }))
  }

  // const handleSubmit = async (event) => {
  //   event.preventDefault();

  //   const response = await fetch(`${domain}/member/signup`, {
  //     method: 'POST',
  //     mode: 'no-cors',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({ memberNick: nickname, memberEmail: email, memberPw: pw1, checkPw: pw2})
  //   });

  //   if (response.ok) {
  //     navigate('/main');
  //   } else {
  //     alert('멤버 가입실패');
  //     console.log(response);
  //   }
  // }

  const handleSubmit = async (event) => {
    event.preventDefault();

    fetch(`${domain}/member/signup`, {
      method: 'POST',
      // mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ memberNick: nickname, memberEmail: email, memberPw: pw1, checkPw: pw2})
    }).then(response => {
      if (response.ok) {
        alert('good');
        navigate('/login')
      }
    }).catch(error => {
      console.error(error.message);
    })
  }

  return (
    <div className="register-member">
      <div className="login-img-wrapper">
        {/* <div>멍BTI LOGO</div> */}
        <img src="assets/LOGO.png" alt="MbtiLogo" width="150px" />
      </div>
      <form onSubmit={handleSubmit} id="email_login">
        <div className="input-box">
          <input
            className="input input-value"
            type="text"
            value={nickname}
            onChange={changeNickname}
            placeholder="닉네임"
          />
          <button className="nickname-check-btn" onClick={checkNickname}>중복 확인</button>
          {!defaultCheck.nickname ? null : ( nicknameCheck ? (
            <span className="material-symbols-outlined check-icon">done</span>
          ) : (
            <span className="material-symbols-outlined bad-check-icon">close</span>    
          ))}
        </div>
        {defaultCheck.nickname && !nicknameCheck && (
          <div className="check-message">사용 중인 닉네임입니다.</div>
        )}
        <div className="input-box">
          <input
            className="input input-value"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일"
          />
        </div>
        <div className="input-box">
          <input
            className="input input-value"
            type="password"
            value={pw1}
            onChange={changePw1}
            onBlur={(e) => validatePassword(e.target.value)}
            placeholder="비밀번호"
          />
          {!defaultCheck.pw1Check ? null : ( pw1Check ? (
            <span className="material-symbols-outlined check-icon">done</span>
          ) : (
            <span className="material-symbols-outlined bad-check-icon">close</span>    
          ))}
        </div>
        {defaultCheck.pw1Check && !pw1Check && (
          <div className="check-message">특수문자, 대소문자, 숫자 1개 이상을 포함해주세요</div>
        )}
        <div className="input-box">
          <input
            className="input input-value"
            type="password"
            value={pw2}
            onChange={changePw2}
            onBlur={blurPw2}
            placeholder="비밀번호 확인"
          />
          {!defaultCheck.pw2Check ? null : ( pw2Check ? (
            <span className="material-symbols-outlined check-icon">done</span>
          ) : (
            <span className="material-symbols-outlined bad-check-icon">close</span>    
          ))}
        </div>
        {defaultCheck.pw2Check && !pw2Check && (
          <div className="check-message">비밀번호가 일치하지 않습니다.</div>
        )}
        <div className="login-wrapper">
          <MyButton text="회원가입" />
        </div>
      </form>
    </div>
  )
}

export default RegisterMember;
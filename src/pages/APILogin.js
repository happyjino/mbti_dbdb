import { useContext, useEffect, useState } from "react";
import MyButton from "../components/MyButton";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthContext";
// import { Kakao } from 'kakao-sdk';

const APILogin = () => {
  // const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  
  const [kakaoLogin, setKakaoLogin] = useState(false);
  if(false) console.log(kakaoLogin, setKakaoLogin)

  useEffect(() => {
    if (login) {
      navigate('/main');
    }
  }, [login])

  const goEmailLogin = () => {
    navigate(`/loginEmail`);
  };

  const goRegister = () => {
    navigate(`/register`);
  }

  const redirectUri = 'http://localhost:3000/login'; // 리다이렉트 URI

  const kakaoCode = new URL(window.location.href).searchParams.get("code");
  const kakaoClientId = 'ef93abe634b47bc062e23cbd5ccd7405'; // 클라이언트 ID
  const kakaoClientSecret = 'RZLUqWa60emw1tXfU8X8jCziKS4ojO43'; // 클라이언트 시크릿

  const handleKakaoLogin = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoClientId}&redirect_uri=${redirectUri}&response_type=code&scope=account_email,openid,talk_message,friends`;
  };

  const requestKakaoAccessToken = async () => {
    const kakaoUrl = 'https://kauth.kakao.com/oauth/token';

    const kakaoParams = new URLSearchParams();
    kakaoParams.append('grant_type', 'authorization_code');
    kakaoParams.append('client_id', kakaoClientId);
    kakaoParams.append('client_secret', kakaoClientSecret);
    kakaoParams.append('redirect_uri', redirectUri);
    kakaoParams.append('code', kakaoCode);

    try {
      const kakaoResponse = await fetch(kakaoUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        },  
        body: kakaoParams,
      });

      const data = await kakaoResponse.json();
      console.log(data.access_token);
      localStorage.setItem('kakao_access_token', data.access_token);
    } catch (error) {
      console.error('액세스 토큰 요청 중 오류 발생:', error);
    }
  };

  const getKakaoAccessToken = async () => {
    const kakaoAccessToken = localStorage.getItem('kakao_access_token');
    
    const response = await fetch('https://kapi.kakao.com/v2/user/me', {
      method: 'POST',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        'Authorization': `Bearer ${kakaoAccessToken}`
      }
    });

    if (response.ok) {
      const result = await response.json();
      console.log(result.kakao_account.email);
    } else {
      alert('실패')
    }
  }

  const googleCode = new URL(window.location.href).searchParams.get("code");
  const googleClientId = '8342887674-j4gf33mhl9rc5trpatu5a2ampqbap0vm.apps.googleusercontent.com'; // 클라이언트 ID
  const googleClientSecret = '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'; // 클라이언트 시크릿

  const handleGoogleLogin = () => {
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleClientId}&redirect_uri=${redirectUri}&response_type=code&scope=email profile`;
  };

  const requestGoogleAccessToken = async () => {
    const googleUrl = 'https://oauth2.googleapis.com/token';

    const googleParams = new URLSearchParams();
    googleParams.append('grant_type', 'authorization_code');
    googleParams.append('client_id', googleClientId);
    googleParams.append('client_secret', googleClientSecret);
    googleParams.append('redirect_uri', redirectUri);
    googleParams.append('code', googleCode);

    try {
      const googleResponse = await fetch(googleUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        },  
        body: googleParams,
      });

      const data = await googleResponse.json();
      console.log(data);
      localStorage.setItem('google_access_token', data.access_token);
    } catch (error) {
      console.error('액세스 토큰 요청 중 오류 발생:', error);
    }
  };
  
  const getGoogleAccessToken = async () => {
    const googleAccessToken = localStorage.getItem('google_access_token');
    
    const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      method: 'GET',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        'Authorization': `Bearer ${googleAccessToken}`
      }
    });

    if (response.ok) {
      const result = await response.json();
      console.log(result);
    } else {
      alert('실패')
    }
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
        <button className="api-button" onClick={handleGoogleLogin}>구글 로그인</button>
        <button className="api-button" onClick={requestGoogleAccessToken}>구글 토큰 획득</button>
        <button className="api-button" onClick={getGoogleAccessToken}>구글 정보 확인</button>
        <button className="api-button" onClick={handleKakaoLogin}>카카오 로그인</button>
        <button className="api-button" onClick={requestKakaoAccessToken}>카카오 토큰 획득</button>
        <button className="api-button" onClick={getKakaoAccessToken}>카카오 이메일 확인</button>
      </div>
      <div className="btn-wrapper">
        <MyButton text="회원가입" onClick={goRegister} />
        <MyButton text="로그인" onClick={goEmailLogin} />
      </div>
    </div>
  );
};

export default APILogin;

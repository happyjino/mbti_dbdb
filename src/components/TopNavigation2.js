import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { LoginStateContext } from "../App";
import { AuthContext } from "./AuthContext";

const TopNavigation2 = () => {
  const domain = "http://ec2-13-209-35-166.ap-northeast-2.compute.amazonaws.com/api"
  const navigate = useNavigate();  
  const nickname = localStorage.getItem('nickname');
  const { loginUpdate } = useContext(AuthContext);

  const logout = () => {
    localStorage.removeItem('token');
    loginUpdate();
    navigate('/');
  }

  // 토글메뉴 오픈
  const [isOpen, setNav] = (useState(false));
  const openMenu = () => {
    setNav(isOpen => !isOpen);
  };

  // 네비게이션
  const goHome = () => {
    navigate('/main');
  };
  const goBack = () => {
    navigate(-1);
  };

  const deleteMember = async () => {
    const token = localStorage.getItem('token');

    const response = await fetch(`${domain}/member/delete`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.ok) {
      localStorage.removeItem('token');
      alert("성공적으로 탈퇴가 되었습니다.")
      loginUpdate();
      navigate('/')
    } else {
      alert("탈퇴 실패");
    }
  }

  return (
    <>
      <header className="top-nav">
        <button className="nav-back" value="1">
          <span className="material-symbols-outlined" onClick={goBack}>arrow_back_ios</span>
        </button>
        <button className="nav-logo" value="2">
          <img src="assets/LOGO.png" onClick={goHome} alt="MbtiLogo"/>
        </button>
        <button className="nav-menu" >
          <span className="material-symbols-outlined" onClick={openMenu}>menu</span>
        </button>    
      </header>
      <div className={isOpen ? `toggle-menu show-menu` : `toggle-menu`}>
        <div className="toggle-menu-top">
          <button className="menu-close-btn" onClick={openMenu}><span className="material-symbols-outlined">expand_less</span>닫힘</button>
          <div className="logout-btn" onClick={logout}><div className="text-box">로그아웃</div></div>
        </div>
        <div className="toggle-menu-content">
          <div className="user-box">
            {nickname} 보호자님
          </div>
          <div className="user-info-box" onClick={() => navigate('/updatePassword')}>
            개인정보 재설정
          </div>
          <div className="user-info-box" onClick={deleteMember}>
            회원 탈퇴
          </div>
        </div>
      </div>
    </>
  );
};

export default TopNavigation2;
  
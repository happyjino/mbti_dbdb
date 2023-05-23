import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginStateContext } from "../App";
import { AuthContext } from "./AuthContext";

const TopNavigation2 = () => {
  const navigate = useNavigate();  
  const { user } = useContext(LoginStateContext);
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
            {user} 보호자님
          </div>
          <div className="user-info-box" >
            개인정보 재설정
          </div>
        </div>
      </div>
    </>
  );
};

export default TopNavigation2;
  
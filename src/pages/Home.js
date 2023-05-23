import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();
    // const dogArr = [];
    const goLink = () => {
        navigate('/login');
    };
    return (
        <div id="Main">
            <div className="main-box" onClick={goLink}>
                <div className="main-logo"><img src="assets/LOGO.png" style={{"width" : "120px"}} alt="MbtiLogo"/></div>
                <div className="main-img-box"></div>
            </div>
        </div>
    );
}

export default Home;

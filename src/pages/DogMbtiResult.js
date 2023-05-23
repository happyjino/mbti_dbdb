import React , {useEffect} from "react";
// import {useState } from "react";
import { useNavigate} from "react-router-dom";
import TopNavigation2 from '../components/TopNavigation2.js';
// import ImageMap from "image-map";
// import ImageMapper from 'react-img-mapper';
import { useLocation } from 'react-router-dom';
import dbtiConnection from '../components/DbtiConnection.js';

const DogMbtiResult = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const goDetail = () => {
    navigate('/DogExplanation', {
      state: location.state
    });
  };
  const goTest = () => {
    navigate('/Question');
  };

  const { step1, step2, step3, step4, ...remaining } = location.state.dbti;
  const dbti = Object.values(remaining).join("");
  const dogResultTest = {
    idx:"dNum1",
    name: location.state.selectedPet, 
    type: dbti,
    typeEx:dbtiConnection[dbti], 
    img:`assets/dbti/${dbti}.jpg`,
    detail1: step1, 
    detail2: step2, 
    detail3: step3, 
    detail4: step4, 
    content: `CTIL 설명 ㅁㄴㅇㅁㄴㅇㅁㄴ
      ㅇㅁㄴㅇㅁㄴ ㅇㅁㄴㅇㅁㄴㅇ
      ㅁㄴㅇ ㅁㄴㅇ ㅁㄴ
      ㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴ ㅇㅁㄴ
      ㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇㅀㅁㄴ
      ㅇㅀㄴㅇㅀㄴ
      ㅇㅀㅗㅇㄹ홍ㄹ홍ㅀ
      ㅗㅇㄹ홍ㄹ홍ㄹ호
      ㅇㄹ홍ㄹ홍ㄹ홍
      CTIL 설명 ㅁㄴㅇㅁㄴㅇㅁㄴ
      ㅇㅁㄴㅇㅁㄴ ㅇㅁㄴㅇㅁㄴㅇ
      ㅁㄴㅇ ㅁㄴㅇ ㅁㄴ
      ㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴ ㅇㅁㄴ
      ㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇㅀㅁㄴ
      ㅇㅀ ㄴㅇㅀㄴ
      ㅇㅀ ㅗㅇㄹ홍ㄹ홍ㅀ
      ㅗㅇㄹ홍ㄹ홍ㄹ호
      ㅇㄹ홍ㄹ홍ㄹ홍ㄹ호`
  };

  // 강아지 mbti 결과
  const {idx,name,type,typeEx,img,detail1,detail2,detail3,detail4,content} = dogResultTest;

  // 프로그레스바 설정
  useEffect(() => {
    const progress_bar = document.getElementById("detail1");
    progress_bar.style.width = `${detail1}%`;
    progress_bar.style.backgroundColor = "#5C4CFF";
  }, [detail1]);

  useEffect(() => {
    const progress_bar = document.getElementById("detail2");
    progress_bar.style.width = `${detail2}%`;
    progress_bar.style.backgroundColor = "#0A9A4A";
  }, [detail2]);

  useEffect(() => {
    const progress_bar = document.getElementById("detail3");
    progress_bar.style.width = `${detail3}%`;
    progress_bar.style.backgroundColor = "#FB7237";
  }, [detail3]);

  useEffect(() => {
    const progress_bar = document.getElementById("detail4");
    progress_bar.style.width = `${detail4}%`;
    progress_bar.style.backgroundColor = "#5186F3";
  }, [detail4]);

  return ( 
    <>
      <div className="result-box">
        <TopNavigation2 />
        {/* <p>MBTI 분석 완료!</p> */}
        <p className="result-word" key={idx}>[{name}] 의 성격유형은 :</p>
        <div className="result-top">
          <div className="result-container">
            <div className="result-detail">
              <div className="detail-img">
                <img src={img} alt="dogDetail img"/>
              </div>
              <div className="progress-container">
                <ul>
                  <li>
                    <p>야생성</p>
                    <div className="progress">
                      <div className="progress-bar" id="detail1" />
                    </div>
                    <p className="percent">{detail1}%</p>
                  </li>
                  <li>
                    <p>관계성</p>
                    <div className="progress">
                      <div className="progress-bar" id="detail2" />
                    </div>
                    <p className="percent">{detail2}%</p>
                  </li>
                  <li>
                    <p>의존성</p>
                    <div className="progress">
                      <div className="progress-bar" id="detail3" />
                    </div>
                    <p className="percent">{detail3}%</p>
                  </li>
                  <li>
                    <p>활동성</p>
                    <div className="progress">
                      <div className="progress-bar" id="detail4" />
                    </div>
                    <p className="percent">{detail4}%</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>                   
        </div>
        <div className="result-content">
          <div className="detail-top">
            <h4>{type.toUpperCase()}</h4>
            <p>{typeEx}</p>
          </div>
          <div className="detail-content">
            <p>{content}</p>
          </div>                  
        </div>
        <div className="mbti-all-explanation">
          <button onClick={goDetail}>MBTI 설명 보러가기</button>
        </div>
        <div className="mbit-btn-group">
          <ul>
            <li>
              <button>결과 공유하기</button>
            </li>
            <li>
              <button onClick={goTest}>다시 테스트하기</button>
            </li>
          </ul>
        </div>
        <div className="share-box">
          <span className="material-symbols-outlined">forward</span>
          <input defaultValue="https://naver.com"/>
          <button>URL 복사</button>
        </div>
      </div>
    </>
  )
};

export default DogMbtiResult;
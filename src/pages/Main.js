import React, {useCallback, useContext, useEffect, useMemo, useState} from 'react';
import { useNavigate } from "react-router-dom";
import TopNavigation from '../components/TopNavigation';
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import { LoginStateContext, PetListContext } from '../App';
import { AuthContext } from '../components/AuthContext';

const Main = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const { petList, setPetList } = useContext(PetListContext);
  const { user } = useContext(LoginStateContext);
  const [loaded, setLoaded] = useState(false);
  const [dogArr, setDogArr] = useState([]);

  // 페이지 이동 navigater
  const goDogAdd = () => {
    navigate('/doginfo');
  };
  const goMbti = () => {
    navigate('/DogSelect');
  };

  const goPost = () => {
    navigate('/dogpost');
  };

  const goPetDetail = (petName) => {
    navigate('/dogdetail', {
      state: petName
    });
  }

  // 이미지 에러시 띄워줄 기본 이미지
  const handleImgError = (e) => {
      e.target.src = "assets/dog.jpg";
  };

  const domain = "/api"

  // 강아지 정보 불러오기
  useEffect(() => {
    const getPet = async () => {
      const response = await fetch(`${domain}/pet/getallpet`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nickname: user })
      });

      if (response.ok) {
        const result = await response.json();
        const getPetList = result.map((pet, index) => ({
          idx: `dNum${index + 1}`,
          name: pet.name,
          src: pet.image,
        }));
        setPetList(getPetList);
        setLoaded(true);
      } else if (response.status === 401) {
        if (login) alert("강아지가 없습니다.");
        setPetList([]);
        setLoaded(true);
      } else {
        console.log(response.status);
        setLoaded(true);
      }
    }
    getPet();
  }, [user]);

  useEffect(() => {
    if (!login) {
      alert("로그인이 필요합니다.");
      navigate('/login');
    }
  }, [login, navigate])

  useEffect(() => {
    if (loaded) {
      if (petList === null || petList.length === 0) {
        alert("강아지 등록을 먼저 해주세요!");
        navigate('/doginfo');
      } else {
        const updatedDogArr = petList.map((item) => (
          <SwiperSlide key={item.idx} className="dog-slide">
            <img
              src={item.src}
              alt={item.name}
              onError={handleImgError}
            />
            <span className="dog-name">{item.name}</span>
            <button className="dog-info-btn" onClick={() => goPetDetail(item.name)}>
              펫 정보
            </button>
          </SwiperSlide>
        ));
        setDogArr(updatedDogArr);
      }
    }
  }, [petList, navigate, loaded]);

  // const dogArr = useMemo(() => petList.map((item) =>  (
  //   <SwiperSlide key={item.idx} className="dog-slide">
  //     <img  
  //       src={item.src}
  //       alt={item.name} 
  //       onError={handleImgError}/>
  //     <span className='dog-name'>{item.name}</span>
  //     <button className='dog-info-btn' onClick={() => goPetDetail(item.name)}>펫 정보</button>
  //   </SwiperSlide>
  // )), [petList, goPetDetail]);  

  // 강아지 목록
  
  return (
    <>
      <TopNavigation />
      <div className="dog-select-warp">
        <div className="dog-select-list">
          <p>MBTI를 검사할 우리 아이를 선택해주세요.</p>
          {/* 이미지 슬라이드 */}
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={25} slidesPerView={1.5} //간격, 보여질 컨텐츠 수
            scrollbar={{ draggable: true }} className="dog-select-list" //드래그
          >
            {/* 강아지 리스트 및 추가하기 */}
            {dogArr} 
            <SwiperSlide className='new-dog-slide' onClick={goDogAdd}><div><span className="material-symbols-outlined">add_circle</span></div></SwiperSlide> 
          </Swiper>
        </div>
        <div className="dog-menu-list">
          <ul>
            <li className="dbti-link" onClick={goMbti}>
              <button>MBTI 분석하기</button>
              <span className="material-symbols-outlined">arrow_forward_ios</span>
            </li>
            <p>4가지 분석 기준에 따라 분류되어 있어요.</p>
            <li className="dog-show-link" onClick={goPost}>
              <button>반려견 자랑하기</button>
              <span className="material-symbols-outlined">arrow_forward_ios</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
   
}

export default Main;
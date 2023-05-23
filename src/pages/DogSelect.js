import React, { useContext, useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import TopNavigation from '../components/TopNavigation';
import { FaCheck } from 'react-icons/fa'
import { PetListContext } from '../App';

const DogBoast = () => {

	const navigate = useNavigate();
  const { petList } = useContext(PetListContext);

	// 강아지 정보 있는지 확인
	useEffect(() => {
		if(petList === null || petList.length === 0){
			console.log("강아지없다.");
			alert("강아지 등록을 먼저 해주세요!");
			navigate('/doginfo');
		}
	}, [petList, navigate]);

	// 이미지 에러시 띄워줄 기본 이미지
	const handleImgError = (e) => {e.target.src = "assets/dog.jpg"};

	// 있는 강아지 리스트
	const dogInfoList = petList;

	const [clickedPet, setClickedPet] = useState("");

	const handleClick = (petName) => {
    setClickedPet(petName);
  };
  
  const handleSelect = () => {
    if (clickedPet === "") {
      alert('분석할 강아지를 선택해주세요');
      return;
    }
    navigate('/question', {
      state: clickedPet
    });
  }

  return (
    <>
      {/* 탑 네비 */}
      <TopNavigation />
      {/* 자랑할 강아지 선택 */}
      <div className="dog-select-warp boat-box">
        <p>
          <span className="material-symbols-outlined">expand_more</span>자랑하고 싶은 아이를 선택해주세요.
        </p>
        <ul className='boast-list'>
          {dogInfoList.map((item) => (
            <li className="dog-slide" key={item.idx} onClick={() => handleClick(item.name)}>
              <img
                style={{ filter: clickedPet === item.name ? "brightness(0.3)" : "brightness(1)" }}
                src={item.src} alt={item.name}
                onError={handleImgError}
              />
              {clickedPet === item.name ? <FaCheck className="check-icon" /> : ""}
              <span className='dog-name'>{item.name}</span>
            </li>
          ))}
          <li onClick={() => navigate('/doginfo')}>
            <div><span className="material-symbols-outlined">add_circle</span></div>
          </li>
        </ul>
        <div className="dog-select-btn">
          <button onClick={handleSelect}>선택</button>
        </div>
      </div>
    </>
  );
}


export default DogBoast;
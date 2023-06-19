import { useLocation, useNavigate } from "react-router-dom";
import MyButton from "../components/MyButton";
import TopNavigation from "../components/TopNavigation";
import MyRadio from "../components/MyRadio";
import DatePicker from 'react-datepicker';
import { PetContext } from "../App";
import { useContext, useRef, useState } from "react";

const petBreedList = ['고든 세터', '골든 리트리버', '꼬똥 드 툴레아', '그레이 하운드', '그레이트 데인', '그레이트 피레이즈', '노르웨이언 엘크 하운드', '노르위치 테리어', '노르포크 테리어', '뉴펀들랜드', '닥스훈트', '달마시안', '댄디 딘몬트 테리어', '도베르만 피셔', '도사견', '동경이', '라이카', '리사 압소', '레브라도 리트리버', '레이크랜드 테리어', '로디지안 리즈백', '롯트 와일러', '마스티프', '말티즈', '말티푸', '맨체스터 테리어', '미니어쳐 슈나우져', '미니어쳐 핀셔', '믹스견', '바센지', '바셋 하운드', '버니즈 마운틴 독', '베드링턴 테리어', '벨지안 말리노이즈', '벨지안 쉽독', '벨지안 터뷰렌', '보더콜리', '보더 테리어', '보리조이', '보스턴 테리어', '복서', '불 테리어', '불 독', '불 마스티프', '브뤼셀 그리펀', '브리타니', '블랜 앤 탄 쿤하운드', '블러드 하운드', '비글', '비숑 프리제', '비어디드 콜리', '비즐라', '사모예드', '사우스 러시안 오프차카', '살루키', '삽살개', '서섹스 스파니엘', '세인트 버나드', '셔틀랜드 쉽독', '소프트 코티드 휘튼 테리어', '스카어 테리어', '스코티시 테리어', '스테포드셔 불 테리어', '스위스 화이트 셰퍼드', '시바견', '시베리안 허스키', '시츄', '실리함 테리어', '아메리칸 불리', '아메리칸 스태퍼드셔 테리어', '아메리칸 에스키모독', '아메리칸 워터 스파니엘', '아메리칸 코카 스파니엘', '아메리칸 핏불 테리어', '아이리쉬 세터', '아이리쉬 울프하운드', '아이리쉬 워터 스파니엘', '아이리쉬 테리어', '아키다', '아펜핀셔', '아프간 하운드', '알래스칸 맬러뮤트', '알래스칸 클리카이', '에어데일 테리어', '오스트레일리안 테리어', '오스트레일리언 셰퍼드', '오스트레일리언 캐틀 독', '오터 하운드', '올드 잉글리쉬 쉽독', '와이마라너', '와이어헤어드 포인팅 그리폰', '와이어 폭스 테리어', '요크셔 테리어', '웨스트 하이랜드 화이트 테리어', '웰시 스프링거 스파니엘', '웰시 코기', '웰시 테리어', '이비전 하운드', '이탈리안 그레이 하운드', '잉글리쉬 세터', '잉글리쉬 스프링거 스파니엘', '잉글리쉬 코카 스파니엘', '잉글리쉬 토이 스파니엘', '잉글리쉬 폭스하운드', '자이언트 슈나우저', '잭 러셀 테리어', '저먼 셰퍼드 독', '저먼 쇼트헤어드 포인터', '저먼 와이어헤어드 포인터', '제주개', '제패니즈 스피츠', '제패니즈 친', '진돗개', '차우차우', '차이니즈 샤페이', '차이니지 크레스티드', '체사피크베이 리트리버', '치와와', '카네 코르소', '카발리에 킹 찰스 스파니엘', '컬리 코티드 리트리버', '케리 블루 테리어', '케언 테리어', '케이스혼트', '코몬톨', '코카시안 오프차카', '콜리', '쿠바츠', '크럼버 스파니엘', '토이 맨체스터 테리어', '티베탄 마스티프', '티베탄 스파니엘', '티베탄 테리어', '파라오 하운드', '파피용', '퍼그', '페키니즈', '포르투칼 워커 독', '포메라니안', '포인터', '폭스 테리어', '푸들', '풍산개', '프렌치 불독', '플랫 코티드 리트리버', '피니시 스피츠', '필드 스파니엘', '해리어', '휘 펫',];

const EditDogInfo = () => {
  const domain = "http://ec2-3-36-140-165.ap-northeast-2.compute.amazonaws.com/api"
  const navigate = useNavigate();
  const location = useLocation();
  const mode = location.state;
  const { petInfo, setPetInfo } = useContext(PetContext);
  const [weightInt, setWeightInt] = useState(Math.floor(petInfo.petWeight))
  const [weightDeci, setWeightDeci] = useState(Math.floor(petInfo.petWeight * 10 % 10))

  const changeValue = (e) => {
    setPetInfo(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const [showCalendar, setShowCalendar] = useState(false);
  const handleIconClick = () => {
    setShowCalendar(!showCalendar);
  }

  const handleDateChange = (date) => {
    const currentDate = new Date();
    const current = currentDate.getFullYear() + String(currentDate.getMonth() + 1).padStart(2, '0') + String(currentDate.getDate()).padStart(2, '0');

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    if (current < year + month + day) {
      alert("잘못된 날짜 선택입니다.")
    } else {
      setPetInfo(prevInfo => ({
        ...prevInfo,
        petBday: `${year}-${month}-${day}`
      }));
    }
  };

  const handleWeightChange = (e) => {
    if (e.target.name === "petWeightInt") {
      if (e.target.value.length < 4) setWeightInt(e.target.value)
      
    } else {
      if (e.target.value.length < 2) setWeightDeci(e.target.value);
    }
  }

  // const [selectedImage, setSelectedImage] = useState(null);
  const inputRef = useRef(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPetInfo(prev => ({
        ...prev,
        petImageFile: URL.createObjectURL(file),
        selectedImage: file
      }))
    }
  };

  const handleImageBoxClick = () => {
    inputRef.current?.click();
  }


  const editDogInfo = async () => {
    const weight = parseFloat(weightInt + "." + weightDeci)

    if (mode === "temp") {
      setPetInfo(prev => ({...prev, petWeight: weight}))
      navigate('/doginfo', {state: "step3"})
      return;
    }

    const token = localStorage.getItem('token');
    if (petInfo.selectedImage) {
      const formData = new FormData();

      formData.append('petName', petInfo.petName);
      formData.append('petBreed', petInfo.petBreed);
      formData.append('petBday', petInfo.petBday);
      formData.append('petGender', petInfo.petGender);
      formData.append('petNtlz', petInfo.petNtlz);
      formData.append('petWeight', weight);
      formData.append('petImageFile', petInfo.selectedImage);

      const response = await fetch(`${domain}/pet/${petInfo.petId}/edit`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      })

      if (response.ok) {
        alert("성공")
        navigate('/dogdetail', {
          state: petInfo.petId
        })
      } else {
        alert('수정 실패');
        const result = await response.json()
        console.log(result.status);
      }
    } else {
      const formData = new FormData();
      const imageUrl = petInfo.petImageFile;
      const imageResponse = await fetch(imageUrl, {
        method: 'GET',
        // mode: 'no-cors'
      });
      if (!imageResponse.ok) {
        console.log("에러")
      }

      const blob = await imageResponse.blob();
      const file = new File([blob], "petImage.jpg", { type: blob.type });

      formData.append('petName', petInfo.petName);
      formData.append('petBreed', petInfo.petBreed);
      formData.append('petBday', petInfo.petBday);
      formData.append('petGender', petInfo.petGender);
      formData.append('petNtlz', petInfo.petNtlz);
      formData.append('petWeight', weight);
      formData.append('petImageFile', file);
      console.log(file);

      const response = await fetch(`${domain}/pet/${petInfo.petId}/edit`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      })

      if (response.ok) {
        alert("성공")
        navigate('/dogdetail', {
          state: petInfo.petId
        })
      } else {
        alert('수정 실패');
        const result = await response.json()
        console.log(result.status);
      }
    }
  }

  return (
    <div className="edit-dog-info">
      <TopNavigation />
      <div className="main">
        <div className="input-title">이름</div>
        <div className="input-box">
          <input className="input input-value" type="text" name="petName" value={petInfo.petName} onChange={changeValue} placeholder="이름" />
        </div>
        <div className="input-title">견종</div>
        <div className="input-box">
          <div className="select-wrapper">
            <select
              name="petBreed" className="pet-breed-box input-value" defaultValue={petInfo.petBreed}
              onChange={(e) => { e.target.style.color = "black"; changeValue(e)}}
            >
              <option value={petInfo.petBreed} disabled hidden>{petInfo.petBreed}</option>
              {petBreedList.map((it, index) => (
                <option key={index} value={it}>{it}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="input-title">
          생년월일
          <span className="material-symbols-outlined calendar" onClick={handleIconClick}>calendar_month</span>
          <DatePicker
            selected={null}
            onChange={handleDateChange}
            dateFormat="yyyy/MM/dd"
          />
        </div>
        <div className="input-box text-left">
          <input className="input input-value date" type="number" name="petBirthYear" value={parseInt(petInfo.petBday.slice(0,4))} placeholder="년" readOnly />
          <input className="input input-value date" type="number" name="petBirthMonth" value={parseInt(petInfo.petBday.slice(5,7))} placeholder="월" readOnly />
          <input className="input input-value date" type="number" name="petBirthDay" value={parseInt(petInfo.petBday.slice(8,10))} placeholder="일" readOnly />
        </div>
        <div className="input-title">성별</div>
        <div className="input-box">
          <MyRadio type="radio" name="petGender" value="MALE" text="남아" checked={petInfo.petGender} onChange={changeValue} />
          <MyRadio type="radio" name="petGender" value="FEMALE" text="여아" checked={petInfo.petGender} onChange={changeValue} />
        </div>
        <div className="input-title">중성화 수술 여부</div>
        <div className="input-box">
          <MyRadio type="radio" name="petNtlz" value="NTLZ" text="유" checked={petInfo.petNtlz} onChange={changeValue} />
          <MyRadio type="radio" name="petNtlz" value="NONE" text="무" checked={petInfo.petNtlz} onChange={changeValue} />
        </div>
        <div className="input-title-box">
          <div className="input-title">이미지</div>
          <div className="input-title">몸무게</div>
        </div>
        <div className="input-box">
          <div className="image-box">
            {petInfo.petImageFile ? (
              <img className="pet-image" alt="펫이미지" src={petInfo.petImageFile} onClick={handleImageBoxClick} />
            ) : (
              <img className="pet-image" src="assets/dog.jpg" alt="dogImg" /> 
            )}
            <input type="file" accept="image/*" onChange={handleImageChange} ref={inputRef} style={{ display: 'none' }} />
            <div className="edit-msg" onClick={handleImageBoxClick}>변경</div>
          </div>
          <div className="weight-box">
            <input className="input input-value" type="number" name="petWeightInt" onChange={handleWeightChange} onBlur={(e) => { if(!e.target.value) setWeightInt(0) }} value={weightInt} />
            <div className="weight-text" style={{ fontSize: "30px" }}>
              .
            </div>
            <input className="input input-value" type="number" name="petWeightDeci" onChange={handleWeightChange} onBlur={(e) => { if(!e.target.value) setWeightDeci(0) }} value={weightDeci} />
            <div className="weight-text">kg</div>
          </div>
        </div>
      </div>
      <div className="btn-wrapper">
        <MyButton text="수정하기" onClick={editDogInfo} />
      </div>
    </div>
  )
}

export default EditDogInfo;
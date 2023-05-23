import { useState, useRef, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import MyButton from "../components/MyButton";
import MyRadio from "../components/MyRadio";
import TopNavigation from "../components/TopNavigation";
import { LoginStateContext } from "../App";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// import "react-datepicker/dist/react-datepicker.module.css";


const petBreedList = ['고든 세터', '골든 리트리버', '꼬똥 드 툴레아', '그레이 하운드', '그레이트 데인', '그레이트 피레이즈', '노르웨이언 엘크 하운드', '노르위치 테리어', '노르포크 테리어', '뉴펀들랜드', '닥스훈트', '달마시안', '댄디 딘몬트 테리어', '도베르만 피셔', '도사견', '동경이', '라이카', '리사 압소', '레브라도 리트리버', '레이크랜드 테리어', '로디지안 리즈백', '롯트 와일러', '마스티프', '말티즈', '말티푸', '맨체스터 테리어', '미니어쳐 슈나우져', '미니어쳐 핀셔', '믹스견', '바센지', '바셋 하운드', '버니즈 마운틴 독', '베드링턴 테리어', '벨지안 말리노이즈', '벨지안 쉽독', '벨지안 터뷰렌', '보더콜리', '보더 테리어', '보리조이', '보스턴 테리어', '복서', '불 테리어', '불 독', '불 마스티프', '브뤼셀 그리펀', '브리타니', '블랜 앤 탄 쿤하운드', '블러드 하운드', '비글', '비숑 프리제', '비어디드 콜리', '비즐라', '사모예드', '사우스 러시안 오프차카', '살루키', '삽살개', '서섹스 스파니엘', '세인트 버나드', '셔틀랜드 쉽독', '소프트 코티드 휘튼 테리어', '스카어 테리어', '스코티시 테리어', '스테포드셔 불 테리어', '스위스 화이트 셰퍼드', '시바견', '시베리안 허스키', '시츄', '실리함 테리어', '아메리칸 불리', '아메리칸 스태퍼드셔 테리어', '아메리칸 에스키모독', '아메리칸 워터 스파니엘', '아메리칸 코카 스파니엘', '아메리칸 핏불 테리어', '아이리쉬 세터', '아이리쉬 울프하운드', '아이리쉬 워터 스파니엘', '아이리쉬 테리어', '아키다', '아펜핀셔', '아프간 하운드', '알래스칸 맬러뮤트', '알래스칸 클리카이', '에어데일 테리어', '오스트레일리안 테리어', '오스트레일리언 셰퍼드', '오스트레일리언 캐틀 독', '오터 하운드', '올드 잉글리쉬 쉽독', '와이마라너', '와이어헤어드 포인팅 그리폰', '와이어 폭스 테리어', '요크셔 테리어', '웨스트 하이랜드 화이트 테리어', '웰시 스프링거 스파니엘', '웰시 코기', '웰시 테리어', '이비전 하운드', '이탈리안 그레이 하운드', '잉글리쉬 세터', '잉글리쉬 스프링거 스파니엘', '잉글리쉬 코카 스파니엘', '잉글리쉬 토이 스파니엘', '잉글리쉬 폭스하운드', '자이언트 슈나우저', '잭 러셀 테리어', '저먼 셰퍼드 독', '저먼 쇼트헤어드 포인터', '저먼 와이어헤어드 포인터', '제주개', '제패니즈 스피츠', '제패니즈 친', '진돗개', '차우차우', '차이니즈 샤페이', '차이니지 크레스티드', '체사피크베이 리트리버', '치와와', '카네 코르소', '카발리에 킹 찰스 스파니엘', '컬리 코티드 리트리버', '케리 블루 테리어', '케언 테리어', '케이스혼트', '코몬톨', '코카시안 오프차카', '콜리', '쿠바츠', '크럼버 스파니엘', '토이 맨체스터 테리어', '티베탄 마스티프', '티베탄 스파니엘', '티베탄 테리어', '파라오 하운드', '파피용', '퍼그', '페키니즈', '포르투칼 워커 독', '포메라니안', '포인터', '폭스 테리어', '푸들', '풍산개', '프렌치 불독', '플랫 코티드 리트리버', '피니시 스피츠', '필드 스파니엘', '해리어', '휘 펫',];

const DogInfo = () => {
  const navigate = useNavigate();
  const { user } = useContext(LoginStateContext);
  const [step, setStep] = useState(1);
  const domain = "/api"
  const [petInfo, setPetInfo] = useState({
    user: user,
    petName: "",
    petBreed: "",
    petBirth: "",
    petBirthYear: "",
    petBirthMonth: "",
    petBirthDay: "",
    petGender: "",
    petNtlz: "",
    petWeight: 0,
    petWeightInt: 0,
    petWeightDeci: 0,
    petImageSrc: "",
  });

  // step2
  const [showCalendar, setShowCalendar] = useState(false);
  const handleIconClick = () => {
    setShowCalendar(!showCalendar);
  }

  const handleDateChange = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    setPetInfo(prevInfo => ({
      ...prevInfo,
      petBirth: `${year}/${month}/${day}`,
      petBirthYear: year,
      petBirthMonth: month,
      petBirthDay: day
    }));
  };

  // step3

  const inputRef = useRef(null);
  const [image, setImage] = useState(null);
  const handleImageBoxClick = () => {
    inputRef.current?.click();
  }

  const handleChange = (event) => {
    const selectedImage = event.target.files?.[0];
    if (selectedImage) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result)
        // console.log(image);
        setPetInfo(prevState => ({
          ...prevState,
          petImageSrc: e.target.result
        }))
      };
      reader.readAsDataURL(selectedImage);
    }
  }

  const goEditDogInfo = () => {
    navigate('/editdoginfo', {
      state: petInfo
    })
  }

  const clickNextButton = () => {
    var checkState = 0
    const inputValueList = Array.from(document.getElementsByClassName("input-value"));
   
    for (var i = 0; i < inputValueList.length; i++){
      var it = inputValueList[i];
      if (it.value === "" || it.value === "견종") {
        alert("모든 내용을 입력해주세요");
        return;
      } else if (it.checked && it.type === "radio") {
        checkState += 1;
      }
    };
    
    if (checkState <= 1 && step === 2) {
      alert("체크하지 않은 항목이 있습니다.");
      return;
    }
    
    inputValueList.map((it) => {
      if (it.checked || it.type !== "radio") {
        setPetInfo((petInfo) => ({ ...petInfo, [it.name]: it.value }));
      }
    });
    setStep(step + 1);

    if (step === 2) {
      setPetInfo((petInfo) => ({
      ...petInfo,
      petBirth: petInfo.petBirthYear + "-" + petInfo.petBirthMonth + "-" + petInfo.petBirthDay,
      petWeight: petInfo.petWeightInt + "." + petInfo.petWeightDeci
    }));
    }
  };

  const petRegister = async () => {
    const response = await fetch(`${domain}/pet/petregister`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(petInfo)
    });

    if (response.ok) {
      navigate('/main');
    } else {
      alert('등록 실패');
    }
  }

  const PetInfoBox = () => {
    if (step === 1) {
      return (
        <>
          <div className="main">
            {/* 이름 입력 */}
            <div className="input-box">
              <input className="input input-value" type="text" name="petName" placeholder="이름" />
            </div>
            {/* 견종 입력 */}
            <div className="input-box">
              <div className="select-wrapper">
                <select
                  name="petBreed" className="pet-breed-box input-value" defaultValue="견종"
                  onChange={(e) => e.target.style.color = "black"}
                >
                  <option value="견종" disabled hidden>견종</option>
                  {petBreedList.map((it, index) => (
                    <option key={index} value={it}>{it}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="btn-wrapper">
            <MyButton text="다음으로" onClick={clickNextButton} />
          </div>
        </>
      );
    } else if (step === 2) {
      return (
        <>
          <div className="main">
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
              <input className="input input-value" type="number" name="petBirthYear" value={petInfo.petBirthYear} placeholder="년" readOnly />
              <input className="input input-value" type="number" name="petBirthMonth" value={petInfo.petBirthMonth} placeholder="월" readOnly />
              <input className="input input-value" type="number" name="petBirthDay" value={petInfo.petBirthDay} placeholder="일" readOnly />
            </div>
            <div className="input-title">성별</div>
            <div className="input-box">
              <MyRadio type="radio" name="petGender" value="Male" text="남아" />
              <MyRadio type="radio" name="petGender" value="Female" text="여아" />
            </div>
            <div className="input-title">중성화 수술 여부</div>
            <div className="input-box">
              <MyRadio type="radio" name="petNtlz" value="Ntlz" text="유" />
              <MyRadio type="radio" name="petNtlz" value="None" text="무" />
            </div>
            <div className="input-title">몸무게</div>
            <div className="input-box">
              <div className="weight-box">
                <input className="input input-value" type="number" name="petWeightInt" placeholder={"00"} />
                <div className="weight-text" style={{ fontSize: "30px" }}>
                  .
                </div>
                <input className="input input-value" type="number" name="petWeightDeci" defaultValue={0} />
                <div className="weight-text">kg</div>
              </div>
            </div>
          </div>
          <div className="btn-wrapper">
            <MyButton
              text="다음으로"
              onClick={clickNextButton}
            />
          </div>
        </>
      );
    } else if (step === 3) {

      return (
        <>
          <div className="main">
            <div className="pet-info-box">
              <div className="box-top-part">
                <div className="pet-name-box">
                  이름 &nbsp;<span className="pet-info-value">{petInfo.petName}</span>
                </div>
                <div className="btn-box">
                  <div className="control-button" onClick={goEditDogInfo}>수정하기</div>
                </div>
              </div>
              <div className="pet-detail-info">
                <div className="pet-image-box">
                  {/* 이미지 등록 전과 등록 후 */}
                  {image ? (
                      <form>
                        <img src={image} className="pet-image" onClick={handleImageBoxClick} />
                        <input type="file" accept="image/*" onChange={handleChange} ref={inputRef} style={{ display: 'none' }} />
                      </form>
                    ) : (
                      <div className="no-pet-image" onClick={handleImageBoxClick}>
                        <form>
                          <img className="pet-image" src="assets/dog.jpg" alt="dogImg" />
                          <input type="file" accept="image/*" onChange={handleChange} ref={inputRef} style={{ display: 'none' }} />
                        </form>
                      </div>
                  )}
                </div>
                <div className="pet-detail">
                  <div className="pet-gender" >
                    성별 <span className="pet-info-value">{petInfo.petGender === "Male" ? "남아" : "여아" }</span>
                  </div>
                  <div className="pet-breed">
                    견종 <span className="pet-info-value">{petInfo.petBreed}</span>
                  </div>
                  <div className="pet-birth">
                    생년월일/나이 <span className="pet-info-value">{petInfo.petBirth} ({2023 + 1 - petInfo.petBirthYear}살) </span>
                  </div>
                  <div className="pet-weight">
                    몸무게 <span className="pet-info-value">{petInfo.petWeight}kg</span>
                  </div>
                  <div className="pet-ntlz">
                    중성화 수술 <span className="pet-info-value">{petInfo.petNtlz === "Ntlz" ? "O" : "X"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="check-message">강아지 정보를 확인해 주세요</div>
          <div className="btn-wrapper">
            <MyButton
              text="완료"
              onClick={() => {
                petRegister();
                navigate("/main");
              }}
            />
          </div>
        </>
      );
    } else {
    }
  };

  return (
    <div className="pet-info">
      <TopNavigation />
      <PetInfoBox />
    </div>
  );
};

export default DogInfo;

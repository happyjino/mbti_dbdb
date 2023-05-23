import { useContext, useEffect, useState } from "react";
import { LoginStateContext, PetListContext } from "../App";
import TopNavigation from "../components/TopNavigation";
import { useLocation, useNavigate } from "react-router-dom";


const DogDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const petName = location.state;
  const { petList } = useContext(PetListContext);
  const { user, memberId } = useContext(LoginStateContext);
  const [petInfo, setPetInfo] = useState({
    petName: "",
    petBreed: "",
    petBirth: "",
    petGender: "",
    petNtlz: "",
    petWeight: 0,
    petImage: "",
  });

  const domain = "/api"

  const getPetDetail = async () => {
    const response = await fetch(`${domain}/pet/getPetDetail`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nickname: user, petName })
    });

    if (response.ok) {
      const result = await response.json();
      setPetInfo({ ...result.petInfo })
    } else {
      console.log('pet 상세불러오기 실패');
    }
  }

  const editPet = () => {

  }

  const deletePet = async () => {
    const response = await fetch(`${domain}/pet/deletePet`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: petInfo.petName, memberId: memberId})
    });

    if (response.ok) {
      navigate('/main')
      if (petList.length === 1) {
        alert('남은 강아지가 없습니다. 강아지를 등록해주세요');
        navigate('/doginfo');
      }
    } else {
      console.log("삭제 실패");
    }
  }

  useEffect(() => {
    getPetDetail();
  }, [])

  return (
    <div className="dog-detail">
      <TopNavigation />
      <>
        <div className="main">
          <div className="pet-info-box">
            <div className="box-top-part">
              <div className="pet-name-box">
                이름 &nbsp;<span className="pet-info-value">{petInfo.petName}</span>
              </div>
              <div className="btn-box">
                <div className="control-button" onClick={editPet}>수정하기</div>
                <div className="control-button" onClick={deletePet}>삭제하기</div>
              </div>
            </div>
            <div className="pet-detail-info">
              <div className="pet-image-box">
                <img src={petInfo.petImage} className="pet-image" />
              </div>
              <div className="pet-detail">
                <div className="pet-gender" >
                  성별 <span className="pet-info-value">{petInfo.petGender === "Male" ? "남아" : "여아" }</span>
                </div>
                <div className="pet-breed">
                  견종 <span className="pet-info-value">{petInfo.petBreed}</span>
                </div>
                <div className="pet-birth">
                  생년월일/나이 <span className="pet-info-value">{petInfo.petBirth} ({2023 + 1 - petInfo.petBirth.slice(0, 4)}살) </span>
                </div>
                <div className="pet-weight">
                  몸무게 <span className="pet-info-value">{Math.round(petInfo.petWeight * 10) / 10}kg</span>
                </div>
                <div className="pet-ntlz">
                  중성화 수술 <span className="pet-info-value">{petInfo.petNtlz === "Ntlz" ? "O" : "X"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>  
    </div>
  )
}

export default DogDetail;
import { useContext, useEffect } from "react";
import { PetContext } from "../App";
import TopNavigation from "../components/TopNavigation";
import { useLocation, useNavigate } from "react-router-dom";


const DogDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const petId = location.state;
  const { petList, petInfo, setPetInfo } = useContext(PetContext);

  const domain = "http://ec2-3-36-140-165.ap-northeast-2.compute.amazonaws.com/api"

  const goEditDogInfo = () => {
    navigate('/editdoginfo')
  }

  const getPetDetail = async () => {
    const token = localStorage.getItem('token');

    const response = await fetch(`${domain}/pet/${petId}/detailInfo`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.ok) {
      const result = await response.json();
      setPetInfo({ ...result.data, petId: petId })
    } else {
      console.log('pet 상세불러오기 실패');
    }
  }

  const deletePet = async () => {
    const petId = petInfo.petId;
    const token = localStorage.getItem('token');

    const response = await fetch(`${domain}/pet/${petId}/deletePet`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
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
                <div className="control-button" onClick={goEditDogInfo}>수정하기</div>
                <div className="control-button" onClick={deletePet}>삭제하기</div>
              </div>
            </div>
            <div className="pet-detail-info">
              <div className="pet-image-box">
                <img src={petInfo.petImageFile} alt="펫이미지" className="pet-image" />
              </div>
              <div className="pet-detail">
                <div className="pet-gender" >
                  성별 <span className="pet-info-value">{petInfo.petGender === "MALE" ? "남아" : "여아" }</span>
                </div>
                <div className="pet-breed">
                  견종 <span className="pet-info-value">{petInfo.petBreed}</span>
                </div>
                <div className="pet-birth">
                  생년월일/나이 <span className="pet-info-value">{petInfo.petBday} ({2023 + 1 - petInfo.petBday.slice(0, 4)}살) </span>
                </div>
                <div className="pet-weight">
                  몸무게 <span className="pet-info-value">{Math.round(petInfo.petWeight * 10) / 10}kg</span>
                </div>
                <div className="pet-ntlz">
                  중성화 수술 <span className="pet-info-value">{petInfo.petNtlz === "NTLZ" ? "O" : "X"}</span>
                </div>
                <div className="pet-dbti">
                  DBTI 결과 <span className="pet-info-value">{petInfo.petDbti === undefined ? "테스트 미실시" : petInfo.petDbti}</span>
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
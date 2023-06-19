import QuestionBox from "../components/QuestionBox";
import TopNavigation from "../components/TopNavigation";
import MyButton from "../components/MyButton";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import questListBox from "../components/QuestListBox"; // 질문 모음

const Question = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { petId, petName } = state;
  const domain = "http://ec2-3-36-140-165.ap-northeast-2.compute.amazonaws.com/api"

  const [step, setStep] = useState(1);
  const [percent, setPercent] = useState(0);
  const [questList, setQuestList] = useState(questListBox.ques1);
  
  const [finished, setFinished] = useState(false);
  const [dbti, setDbti] = useState({
    step1: 0,
    step2: 0,
    step3: 0,
    step4: 0,
    protoDog: "C", // W
    dependency: "T", // N
    relationship: "E", // I
    activity: "A" // L
  });

  const percentIncrease = (num) => {
    if (num % 3 === 0) {
      setPercent((percent) => percent + 6);
    } else {
      setPercent((percent) => percent + 7);
    }
  };

  useEffect(() => {
    // 진행 퍼센트 바
    const charge_bar = document.getElementById("charging");
    charge_bar.style.width = `${percent}%`;
  }, [percent]);

  useEffect(() => {
    // 체크된 요소 점수 합산
    const elements = document.querySelectorAll("input:checked");
    var stepScore = 0;
    elements.forEach((it) => {
      if (it.getAttribute('data-label') === 'plus') {
        stepScore = stepScore + parseInt(it.getAttribute("value"));
      } else {
        stepScore = stepScore - parseInt(it.getAttribute("value"));
      }
    });

    // 해당 스텝에 점수 부여
    if (step >= 2){
      setDbti((prevDbti) =>
        ({ ...prevDbti, [`step${step-1}`]: Math.round((stepScore+45)/90*100) })
      );
    }
    
    // 마지막 스텝일 경우 결과페이지로~
    if (step === 5) {
      if (dbti.step1 > 50) {
        setDbti(prevDbti => ({
          ...prevDbti,
          protoDog: "W"
        }))
      }
      if (dbti.step2 > 50) {
        setDbti(prevDbti => ({
          ...prevDbti,
          dependency: "N"
        }))
      }
      if (dbti.step3 > 50) {
        setDbti(prevDbti => ({
          ...prevDbti,
          relationship: "I"
        }))
      }
      if (dbti.step4 > 50) {
        setDbti(prevDbti => ({
          ...prevDbti,
          activity: "L"
        }))
      }
      setFinished(true);
      return;
    }

    setQuestList(questListBox[`ques${step}`]);
    

    // 질문 세팅 초기화 -> 체크 된거 해제 및 선택 불가 활성화
    setPercent(0);
    const allQuestion = document.getElementsByClassName("check-element");
    for (var i = 0; i < allQuestion.length; i++) {
      allQuestion[i].checked = false;
      allQuestion[i].disabled = true;
    }

    // 첫 질문은 선택 가능하도록 세팅 및 페이지 제일 위로 이동
    const firstQuestion = document.getElementById(`box0`);
    firstQuestion.style.opacity = 1;
    window.scrollTo(0, 0);
    document.getElementsByName(`question0`).forEach((it) => it.removeAttribute("disabled"));
  }, [step]);

  useEffect(() => {
    if (finished) {
      const dbtiDetail = {
        dbtiName: dbti.protoDog + dbti.dependency + dbti.relationship + dbti.activity
        // ...dbti,
        // petName: petName
      }
      
      console.log(dbtiDetail)

      const updateDbti = async () => {
        const token = localStorage.getItem('token');

        const response = await fetch(`${domain}/pet/${petId}/dbti`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(dbtiDetail)
        })
        if (response.ok) {
          alert('성공')
          navigate(`/DogMbtiResult?dbtiId=${petId}`, {
            state: { petName: petName, dbti: dbti }
          });
        } else {
          alert('실패');
        }
      }

      updateDbti();
    }
  }, [finished])

  const NextButton = () => {
    if (percent !== 100) {
      return (
        <MyButton
          type="incomplete"
          text="위 문항의 응답을 완료해주세요."
          disabled={true}
        />
      );
    } else {
      return (
        <MyButton type="question-next" onClick={() => setStep(step + 1)} />
      );
    }
  };

  // prettier-ignore
  return (
    <div className="question">
      <TopNavigation />
      <div className="process-bar">
        <div className="percent">{percent}%</div>
        <div className="bar">
          <div className="charge-bar" id="charging" />
        </div>
        <div className="step">{step}/4</div>
      </div>
      {questList.map((it, index) => (
        <QuestionBox
          key={index}
          num={index}
          text={it[Object.keys(it)[0]]}
          percentIncrease={percentIncrease}
          step={step}
          QuesType={Object.keys(it)[0]}
        />
      ))}
      <div className="btn-wrapper">
        <NextButton />
      </div>
    </div>
  );
};

export default Question;

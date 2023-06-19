import "./App.css";
import "./css/APILogin.css";
import "./css/EmailLogin.css";
import "./css/ForgetPw.css";
import "./css/MyButton.css";
import "./css/Question.css";
import "./css/PageAnimation.css";
import "./css/QuestionBox.css";
import "./css/MyInput.css";
import "./css/DogInfo.css";
import "./css/DogDetail.css";
import "./css/Reset.css";
import "./css/DogPost.css";
import "./css/Home.css";
import "./css/DogMbtiResult.css";
import "./css/TopNavigation2.css";
import "./css/TopNavigation.css";
import "./css/DogSelect.css";
import "./css/DogExplanation.css";
import "./css/DogBoast.css";
import "./css/RegisterMember.css";
import "./css/EditDogInfo.css";
import "./css/UpdatePassword.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import APILogin from "./pages/APILogin";
import EmailLogin from "./pages/EmailLogin";
import ForgetPw from "./pages/ForgetPw";
import Question from "./pages/Question";
import DogSelect from './pages/DogSelect.js';
import DogInfo from "./pages/DogInfo";
// import Transition from "./components/Transition";
import Home from "./pages/Home.js";
import Main from "./pages/Main.js";
import DogPost from "./pages/DogPost";
import DogMbtiResult from './pages/DogMbtiResult.js';
import DogExplanation from './pages/DogExplanation.js';
import DogBoast from "./pages/DogBoast";
import RegisterMember from "./pages/RegisterMember";
import DogDetail from "./pages/DogDetail";
import UpdatePassword from "./pages/UpdatePassword";
import Test from "./pages/test";

import { createContext, useState } from "react";

import { AuthProvider } from "./components/AuthContext";
import EditDogInfo from "./pages/EditDogInfo";
import AuthKakao from "./pages/AuthKakao";


export const PetContext = createContext();

function App() {

  const [petList, setPetList] = useState([]);
  const [petInfo, setPetInfo] = useState({
    petId: 0,
    petName: "",
    petBreed: "",
    petBday: "",
    petGender: "",
    petNtlz: "",
    petWeight: 0,
    petImageFile: "",
    petDbti: ""
  });

  return (
    <BrowserRouter>
      <div className="App">
        <PetContext.Provider value={{ petList, setPetList, petInfo, setPetInfo }}>
          <AuthProvider >
            <Routes>
              <Route path="/login" element={<APILogin />} />
              <Route path="/auth" element={<AuthKakao />} />
              <Route path="/loginEmail" element={<EmailLogin />} />
              <Route path="/forgetPw" element={<ForgetPw />} />
              <Route path="/question" element={<Question />} />
              <Route path="/doginfo" element={<DogInfo />} />
              <Route path="/dogdetail" element={<DogDetail />} />
              <Route path="/editdoginfo" element={<EditDogInfo />} />
              <Route path="/main" element={<Main />} />
              <Route path="/" element={<Home />} />
              <Route path="/DogMbtiResult" element={<DogMbtiResult />} />
              <Route path="/DogExplanation" element={<DogExplanation />} />
              <Route path="/dogpost" element={<DogPost />} />
              <Route path="/DogBoast" element={<DogBoast />} />
              <Route path="/register" element={<RegisterMember />} />
              <Route path="/updatePassword" element={<UpdatePassword />} />
              <Route path="/DogSelect" element={<DogSelect />} />
              <Route path="/test" element={<Test />} />
            </Routes>
          </AuthProvider>
        </PetContext.Provider>
      </div>
    </BrowserRouter>
    // <BrowserRouter>
    //   <div className="App">
    //     <Transition />
    //   </div>
    // </BrowserRouter>
  );
}

export default App;

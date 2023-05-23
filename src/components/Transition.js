import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Route, Routes, useLocation } from "react-router-dom";
import APILogin from "../pages/APILogin";
import EmailLogin from "../pages/EmailLogin";
import Question from "../pages/Question";
import DogInfo from "../pages/DogInfo";

const Transition = () => {
  const location = useLocation();

  return (
    <TransitionGroup classNames="transition-group">
      <CSSTransition key={location.pathname} classNames="fade" timeout={0}>
        <Routes location={location}>
          <Route path="/" element={<APILogin />} />
          <Route path="/login" element={<EmailLogin />} />
          <Route path="/question" element={<Question />} />
          <Route path="/doginfo" element={<DogInfo />} />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default Transition;

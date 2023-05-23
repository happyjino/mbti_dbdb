const MyButton = ({ type, text, onClick, disabled }) => {
  const btn_type = type;

  const content = () => {
    if (type === "arrow") {
      return (
        <div className="arrow-btn">
          <div className="btn-text-left">{text}</div>
          <span className="material-symbols-outlined btn-text-right">
            arrow_forward_ios
          </span>
        </div>
      );
    } else if (type === "question-next") {
      return (
        <div className="arrow-btn">
          <div className="question-next-button">다음</div>
          <span className="material-symbols-outlined question-button-arrow">
            east
          </span>
        </div>
      );
    } else {
      return text;
    }
  };

  return (
    <button
      className={["button", `${btn_type}`].join(" ")}
      onClick={onClick}
      disabled={disabled}
    >
      {content()}
    </button>
  );
};

export default MyButton;

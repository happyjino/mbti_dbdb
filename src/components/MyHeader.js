const MyHeader = () => {
  return (
    <header className="header">
      <span className="material-symbols-outlined head-icon-left">
        <a className="home-icon" href="/">
          home
        </a>
      </span>
      <div className="head-text">DBTI 분석하기</div>
      <span className="material-symbols-outlined head-icon-right">list</span>
    </header>
  );
};

export default MyHeader;

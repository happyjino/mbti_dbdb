const Test = () => {

  const jsKey = "ec89399558b9b5b8b89d32c7a1b5b840";
  const kakao = window.Kakao;

  if (!kakao.isInitialized()) {
    kakao.init(jsKey);
    console.log(kakao.isInitialized());
  }
  // console.log(kakao.Share)
  const handleShare = () => {
    kakao.Share.createDefaultButton({
      container: '#kakaotalk-sharing-btn',
      objectType: "text",
      text: "테스트하기",
      link: {
        webUrl: 'https://localhost:3000'
      }
    })
  }

  return (
    <div className="Test">
      <div onClick={handleShare} id="kakaotalk-sharing-btn">
        <img src="https://developers.kakao.com/assets/img/about/logos/kakaotalksharing/kakaotalk_sharing_btn_medium.png"
          alt="카카오톡 공유 보내기 버튼" />
      </div>
    </div>
  )
}

export default Test
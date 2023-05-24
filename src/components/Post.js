import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Post = ({ postData, user, onChange }) => {
  
  const [likeClick, setLikeClick] = useState(postData.likeClick);
  const [heartImg, setHeartImg] = useState("heart_empty");
  const [heartSticker, setHeartSticker] = useState("none");
  const [contentEdit, setContentEdit] = useState(false);
  const [content, setContent] = useState(postData.content);
  const navigate = useNavigate();
  const domain = "http://ec2-13-209-35-166.ap-northeast-2.compute.amazonaws.com:8080"

  const clickLike = async () => {
    const postId = postData.postId;
    const token = localStorage.getItem('token');

    const response = await fetch(`${domain}/post/clickLike`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ postId, user })
    });

    if (response.ok) {
      const result = await response.json();
      postData.like = result.like;
      setLikeClick(true);
      setHeartImg("heart");
      setHeartSticker("flex");
      setTimeout(() => { setHeartSticker("none") }, 1000);
    } else {
      console.log("좋아요 누르기 실패");
    }
  }

  const cancelLike = async () => {
    const postId = postData.postId;
    const token = localStorage.getItem('token');

    const response = await fetch(`${domain}/post/cancelLike`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ postId, user })
    });

    if (response.ok) {
      const result = await response.json();
      postData.like = result.like;
      setHeartImg("heart_empty");
      setLikeClick(false);
    } else {
      console.log("좋아요 취소하기 실패");
    }
  }

  const updatePost = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${domain}/post/updatePost`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({postId: postData.postId, content: content})
    })

    if (response.ok) {
      setContentEdit(false);
    } else {
      console.log("수정 실패");
    }
  }

  const deletePost = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${domain}/post/deletePost`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({postId: postData.postId})        
    })
    if (response.ok) {
      alert("삭제 성공");
      onChange(true);
    } else {
      console.log("삭제 실패")
    }
  }

  const clickHeart = () => {
    if (likeClick === true) {
      cancelLike();
    } else {
      clickLike();
    }
  };
  
  useEffect(() => {
    if (likeClick === true) {
      setHeartImg("heart");
    } else {
      setHeartImg("heart_empty");
    }
  }, []);
  
  return (
    <div className="post-box">
      <div className="post-head">
        <img className="pet-img" src={postData.petImg} />
        {/* <div className="pet-img" /> */}
        <div className="post-info">
          <div className="post-writer">
            <span className="person-name">{postData.userName }</span>
            <span className="dog-name">{postData.petName} &nbsp;{postData.petDbti}</span>
          </div>
          <div className="post-date">10분 전</div>
        </div>
        <div className="menu-box">
          <span className="material-symbols-outlined menu" style={{marginTop: "10px"}}>more_vert</span>
          <div className="dropdown-content">
            {postData.userName === user
                ? (<><span onClick={() => setContentEdit(true)}>수정</span>
                  <span onClick={deletePost}>삭제</span></>)
                : (<>
                    <span>공유</span>
              </>)
            }
          </div>
        </div>
      </div>
      <div className="post-image">
        <img className="pet-post-image" src={postData.imageUrl} alt="강아지이미지" width="380px" />
        <img className="heart-sticker" src="assets/heart_stick.png" alt="하트 스티커" style={{ display: `${heartSticker}`}} />
      </div>
      <div className="post-like">
        <img src={`assets/${heartImg}.png`} alt="heart" onClick={clickHeart} style={{ width: "30px" }} />
        <div
          className="like-number"
          style={{ fontSize: "25px", fontWeight: "100", marginLeft: "10px" }}
        >
          {postData.like}
        </div>
      </div>
      {contentEdit ? (
        <div className="post-content">
          <textarea value={content} onChange={(e) => setContent(e.target.value)} />
          <div className="edit-btn" onClick={updatePost}>완료</div>
        </div>
      ): (
        <div className="post-content">{content}</div>
      )}
    </div>
  );
};

export default Post;
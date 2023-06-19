import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import moment from "moment";
import 'moment/locale/ko';

const Post = ({ postData, user, onChange }) => {

  const regex = /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})\.\d{5}/;
  const createdAt = postData.createdAt.match(regex).slice(1).join('');
  const year = parseInt(createdAt.slice(0, 4));
  const month = parseInt(createdAt.slice(4, 6)) - 1;
  const day = parseInt(createdAt.slice(6, 8));
  const hour = parseInt(createdAt.slice(8, 10));
  const minute = parseInt(createdAt.slice(10, 12));
  const second = parseInt(createdAt.slice(12, 14));
  const timeGap = moment([year, month, day, hour, minute, second]).fromNow();
  
  const [likeClick, setLikeClick] = useState(postData.likeClick);
  const [heartImg, setHeartImg] = useState("heart_empty");
  const [heartSticker, setHeartSticker] = useState("none");
  const [contentEdit, setContentEdit] = useState(false);
  const [content, setContent] = useState(postData.content);
  // const navigate = useNavigate();
  const domain = "http://ec2-3-36-140-165.ap-northeast-2.compute.amazonaws.com/api"
  const clickLike = async () => {
    const token = localStorage.getItem('token');

    const response = await fetch(`${domain}/post/${postData.postId}/like`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.ok) {
      postData.like = postData.like + 1;
      setLikeClick(true);
      setHeartImg("heart");
      setHeartSticker("flex");
      setTimeout(() => { setHeartSticker("none") }, 1000);
    } else {
      console.log("좋아요 누르기 실패");
    }
  }

  const cancelLike = async () => {
    const token = localStorage.getItem('token');

    const response = await fetch(`${domain}/post/${postData.postId}/dislike`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.ok) {
      postData.like = postData.like - 1;
      setHeartImg("heart_empty");
      setLikeClick(false);
    } else {
      console.log("좋아요 취소하기 실패");
    }
  }

  const updatePost = async () => {
    const formData = new FormData();
    const imageUrl = postData.petImageFile;
    const imageResponse = await fetch(imageUrl, {
      method: 'GET',
    });
    if (!imageResponse.ok) {
      console.log("이미지 불러오기 에러(게시물 수정)")
    }
    const blob = await imageResponse.blob();
    const file = new File([blob], "postImage.jpg", { type: blob.type });

    formData.append('petId', postData.petId)
    formData.append('postImageFile', file)
    formData.append('content', content)

    const token = localStorage.getItem('token');
    const response = await fetch(`${domain}/post/${postData.petId}/edit`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    })

    if (response.ok) {
      setContentEdit(false);
    } else {
      console.log("수정 실패");
    }
  }

  const deletePost = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${domain}/post/${postData.postId}/deletePost`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }    
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
  }, [likeClick]);
  
  return (
    <div className="post-box">
      <div className="post-head">
        <img className="pet-img" src={postData.petImg} alt="pet-img"/>
        {/* <div className="pet-img" /> */}
        <div className="post-info">
          <div className="post-writer">
            <span className="person-name">{postData.userName }</span>
            <span className="dog-name">{postData.petName} &nbsp;{postData.petDbti}</span>
          </div>
          <div className="post-date">{timeGap}</div>
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
          <textarea value={content} placeholder="50자 이내로 작성해주세요." onChange={(e) => setContent(e.target.value)} />
          <div className="edit-btn" onClick={updatePost}>완료</div>
        </div>
      ): (
        <div className="post-content">{content}</div>
      )}
    </div>
  );
};

export default Post;
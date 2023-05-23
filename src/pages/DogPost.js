import React, { useContext, useState } from "react";
import { useEffect } from "react";
import TopNavigation from "../components/TopNavigation";
import { useNavigate } from "react-router-dom";
import { LoginStateContext } from "../App";
// import HeartImg from "../assets/heart.png";
import Post from '../components/Post';
import { AuthContext } from "../components/AuthContext";

const DogPost = () => { 

  const { user } = useContext(LoginStateContext);
  const [posts, setPosts] = useState([]);
  const [change, setChange] = useState(true);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const domain = "/api"

  useEffect(() => {
    if (!login) {
      alert('로그인이 필요합니다');
      navigate('/login');
    }
  }, [])

  const getPostData = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${domain}/post/getallpost`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ nickname: user })
    });

    if (response.ok) {
      const result = await response.json();
      setPosts([]);
      for (let post of result) {
        setPosts(prevPost => ([...prevPost, {
          content: post.content,
          imageUrl: post.image,
          memberId: post.memberId,
          petId: post.petId,
          postId: post.postId,
          createdDate: post.createdDate,
          userName: post.userName,
          petName: post.petName,
          petDbti: post.petDbti,
          petImg: post.petImg,
          like: post.like,
          likeClick: post.clickedLike
        }]))
      }
    } else {
      alert('실패');
    }
  }

  useEffect(() => {
    if (change === true) {
      getPostData();
      setChange(false);
    }
  }, [change])

  const goBoast = () => {
    navigate('/dogBoast');
  };

  return (
    <>
      <div className="dog-post">
        <TopNavigation />
        <div className="btn-wrapper">
          <button className="post-button" onClick={goBoast}>자랑하기</button>
        </div>
        <div className="post-content">
          {posts.map((it, index) => (
            <Post postData={it} key={index} user={user} onChange={setChange} />
          ))}
        </div>
      </div>
    </>
  );
};

export default DogPost;

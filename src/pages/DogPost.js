import React, { useContext, useState } from "react";
import { useEffect } from "react";
import TopNavigation from "../components/TopNavigation";
import { useNavigate } from "react-router-dom";
import Post from '../components/Post';
import { AuthContext } from "../components/AuthContext";

const DogPost = () => { 

  const [posts, setPosts] = useState([]);
  const [change, setChange] = useState(true);
  const nickname = localStorage.getItem('nickname');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const domain = "http://ec2-3-36-140-165.ap-northeast-2.compute.amazonaws.com/api"

  useEffect(() => {
    // if (!login) {
    //   alert('로그인이 필요합니다');
    //   navigate('/login');
    // }

     const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (scrollTop + windowHeight >= documentHeight) {
        // 스크롤이 끝까지 내려갔을 때 실행될 함수
        // 여기에 원하는 동작을 추가하세요.
        // console.log('스크롤이 끝까지 내려갔습니다.');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, [document.documentElement.scrollHeight])

  const getPostData = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${domain}/post/list`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.ok) {
      const result = await response.json();
      
      setPosts([]);
      for (let post of result.data.posts) {
        setPosts(prevPost => ([...prevPost, {
          postId: post.postId,
          petId: post.petId,
          content: post.content,
          imageUrl: post.postImageUrl,
          like: post.likeCount,
          createdAt: post.createdAt,
          createdDate: post.createdDate,
          memberId: post.memberId,
          userName: post.nickname,
          likeClick: post.isPostLiked,
          petImg: post.petImageUrl,
          petDbti: post.petDbti,
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
            <Post postData={it} key={index} user={nickname} onChange={setChange} />
          ))}
        </div>
      </div>
    </>
  );
};

export default DogPost;

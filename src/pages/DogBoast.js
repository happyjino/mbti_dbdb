import React, { useContext, useEffect, useRef, useState} from 'react';
import { useNavigate } from "react-router-dom";
import TopNavigation from '../components/TopNavigation';
import { FaCheck } from 'react-icons/fa'
import { PetContext } from '../App';

const DogBoast = () => {
	const domain = "http://ec2-3-36-140-165.ap-northeast-2.compute.amazonaws.com/api"
	const { petList } = useContext(PetContext);
	const navigate = useNavigate();
	const [page, setPage] = useState(1);
	const [clickedPet, setClickedPet] = useState("");
	const [content, setContent] = useState("");
	const [selectedImage, setSelectedImage] = useState();
	const [imageUrl, setImageUrl] = useState('');

	// 강아지 정보 있는지 확인
	useEffect(() => {
		if(petList === null || petList.length === 0){
			console.log("강아지없다.");
			alert("강아지 등록을 먼저 해주세요!");
			navigate('/doginfo');
		}
	}, [petList, navigate]);

	// 이미지 에러시 띄워줄 기본 이미지
	const handleImgError = (e) => {e.target.src = "assets/dog.jpg"};

	const handleClick = (petId) => {
		setClickedPet(petId);
	};

	const inputRef = useRef(null);
  const handleImageBoxClick = () => {
    inputRef.current?.click();
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
			setSelectedImage(file);
			setImageUrl(URL.createObjectURL(file))
    }
  };

	const createPost = async () => {
		const token = localStorage.getItem('token');
		const formData = new FormData();
    formData.append('petId', clickedPet);
    formData.append('postImageFile', selectedImage);
    formData.append('content',  content);

		const response = await fetch(`${domain}/post/${clickedPet}/register`, {
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${token}`
			},
			body: formData
		});

		if (response.ok) {
			alert('create post good');
		} else {
			alert('create post bad')
		}

		navigate('/dogpost');
	}

	if(page === 1){
		return (
			<>
				{/* 탑 네비 */}
				<TopNavigation />
				{/* 자랑할 강아지 선택 */}
				<div className="dog-select-warp boat-box">
					<p>
						<span className="material-symbols-outlined">expand_more</span>자랑하고 싶은 아이를 선택해주세요.
					</p>
					<ul className='boast-list'>
						{petList.map((item) => (
							<li className="dog-slide" key={item.idx} onClick={() => handleClick(item.idx)}>
								<img
									style={{ filter: clickedPet === item.idx ? "brightness(0.3)" : "brightness(1)" }}
									src={item.src} alt={item.idx}
									onError={handleImgError}
								/>
								{clickedPet === item.idx ? <FaCheck className="check-icon" /> : ""}
								{/* <span className='dog-name'>{item.name}</span> */}
							</li>
						))}
						<li onClick={() => navigate('/doginfo')}>
							<div><span className="material-symbols-outlined">add_circle</span></div>
						</li>
					</ul>
					<div className="dog-select-btn">
						<button onClick={() => setPage(2)}>선택</button>
					</div>
				</div>
			</>
		);
	}
	else{
		return (
			<>
				{/* 탑 네비 */}
				<TopNavigation />
				{/* 전송 폼 */}
				<form className='boast-form'> 
					<div className='img-box'>
						<div className='boast-img' onClick={handleImageBoxClick}>
							{/* {imageUrl !== '' ? imageUrl && <img src={imageUrl} alt="preview-img" /> : <span className="material-symbols-outlined">add_circle</span>} */}
							{imageUrl !== '' ? <img src={imageUrl} alt="preview-img" />:<span className="material-symbols-outlined">add_circle</span>}
						</div>
						<label className="profile-label" htmlFor="profileImg">사진 추가</label>
						<input
							className="profile-input" type="file"
							accept="image/*" id="profileImg"
							onChange={handleImageChange} 
						/>
					</div>
					<div className='boast-content'>
						<img src='assets/rrrr_2.png' alt='발바닥모양'/>
						<textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder='50자 이내로 작성해주세요.'></textarea>
					</div>
					<div className='boast-submit dog-select-btn'>
						<button type="button" onClick={createPost}>자랑하기</button>
					</div>
				</form>
			</>
		);
	}

}

export default DogBoast;
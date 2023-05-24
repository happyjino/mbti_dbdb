import React, { useContext, useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import TopNavigation from '../components/TopNavigation';
import { FaCheck } from 'react-icons/fa'
import { LoginStateContext, PetContext } from '../App';

const DogBoast = () => {
	const domain = "/api"

	const { petList } = useContext(PetContext);
	const { user } = useContext(LoginStateContext);

	const navigate = useNavigate();

	const [page, setPage] = useState(1);
	const [imageSrc, setImageSrc] = useState('');
	const dogInfoList = petList;
	const [clickedPet, setClickedPet] = useState("");
	const [content, setContent] = useState("");
	const [mpinfo, setMpinfo] = useState({
		nickname: user,
		petName: ""
	})

	let post;

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

	const handleClick = (petName) => {
		setClickedPet(petName);
		setMpinfo(prevInfo => ({...prevInfo, petName: petName}))
	};

	const getMemberPetID = async () => {

		const response = await fetch(`${domain}/getPetMemberID`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(mpinfo)
		});

		if (response.ok) {
			const result = await response.json();
			post = {
				content: content,
				imageUrl: imageSrc,
				memberId: result.memberId,
				petId: result.petId
			}
		} else {
			alert('petmemberID 가져오기 실패')
		}
	}

	const createPost = async () => {
		
		await getMemberPetID();
		const token = localStorage.getItem('token');

		const response = await fetch(`${domain}/post/createpost`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			},
			body: JSON.stringify(post)
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
						{dogInfoList.map((item) => (
							<li className="dog-slide" key={item.idx} onClick={() => handleClick(item.name)}>
								<img
									style={{ filter: clickedPet === item.name ? "brightness(0.3)" : "brightness(1)" }}
									src={item.src} alt={item.name}
									onError={handleImgError}
								/>
								{clickedPet === item.name ? <FaCheck className="check-icon" /> : ""}
								<span className='dog-name'>{item.name}</span>
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
		const encodeFileToBase64 = (fileBlob) => {
			const reader = new FileReader();
			reader.readAsDataURL(fileBlob);

			return new Promise((resolve) => {
				reader.onload = () => {
					setImageSrc(reader.result);
					resolve();
				};
			});
		};

		return (
			<>
				{/* 탑 네비 */}
				<TopNavigation />
				{/* 전송 폼 */}
				<form className='boast-form'> 
					<div className='img-box'>
						<div className='boast-img'>
							{imageSrc !== '' ? imageSrc && <img src={imageSrc} alt="preview-img" />:<span className="material-symbols-outlined">add_circle</span>}
						</div>
						<label className="profile-label" htmlFor="profileImg">사진 추가</label>
						<input
							className="profile-input" type="file"
							accept="image/*" id="profileImg"
							onChange={(e) => {encodeFileToBase64(e.target.files[0])}} 
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
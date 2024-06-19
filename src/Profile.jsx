import React, { useState } from 'react'
import './profile.css'
import { Nav, Navbar } from 'react-bootstrap'

const Profile = () => {
  // 각 정보를 담을 상태 정의
  const [name, setName] = useState('')
  const [nickname, setNickname] = useState('')
  const [email, setEmail] = useState('')
  const [description, setDescription] = useState('')
  const [profileImage, setProfileImage] = useState(null)
  const [profileImageUrl, setProfileImageUrl] = useState(null)

  // 저장 버튼 클릭 시 실행되는 함수
  const handleSave = () => {
    console.log('이름:', name)
    console.log('닉네임:', nickname)
    console.log('이메일:', email)
    console.log('설명:', description)
    console.log('프로필 사진:', profileImage)
  }

  // 프로필 사진 변경 시 실행되는 함수
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setProfileImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImageUrl(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  // 파일 선택 버튼 클릭 시 실행되는 함수
  const handleChooseFile = () => {
    document.getElementById('fileInput').click()
  }

  return (
    <div className='phone-frame'>
      {/* <Navbar bg='light'>
        <Navbar.Brand className='mx-auto' href='#'>
          HKMap
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ml-auto'>
            <Nav.Link href='#'>
              <img src='/mintori.png' alt='Profile' width='30' height='30' />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar> */}
      <div className='profile-container'>
        <h2>내 프로필</h2>
        <div className='profile-image-section'>
          {profileImageUrl && (
            <div className='profile-image-preview'>
              <img src={profileImageUrl} alt='프로필 미리보기' />
            </div>
          )}
          <input
            id='fileInput'
            type='file'
            accept='image/*'
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />
          <button onClick={handleChooseFile} className='choose-file-button'>
            프로필 사진 선택
          </button>
        </div>
        <div className='profile-details'>
          <div className='user-details'>
            <div>
              <span>이름: </span>
              <input
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='이름을 입력하세요'
              />
            </div>
            <div>
              <span>닉네임: </span>
              <input
                type='text'
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder='닉네임을 입력하세요'
              />
            </div>
            <div>
              <span>이메일: </span>
              <input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='이메일을 입력하세요'
              />
            </div>
            <div>
              <span>설명: </span>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder='설명을 입력하세요'
                rows={5} // 행의 수 지정
                cols={36} // 열의 수 지정
                style={{ resize: 'none' }} // 크기 조절 비활성화
              />
            </div>
          </div>
        </div>
        <button onClick={handleSave}>저장</button>
      </div>
    </div>
  )
}

export default Profile

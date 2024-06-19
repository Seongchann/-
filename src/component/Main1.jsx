import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import {
  Button,
  Container,
  Form,
  Badge,
  Navbar,
  Nav,
  Row,
  Col,
} from 'react-bootstrap'
import '../main.css'

function Main1() {
  const [weatherData, setWeatherData] = useState(null);
  const [schedule, setSchedule] = useState(() => {
    // 로컬 스토리지에서 시간표 데이터를 불러옵니다.
    const savedSchedule = localStorage.getItem('schedule');
    return savedSchedule ? JSON.parse(savedSchedule) : [];
  });
  const [newSchedule, setNewSchedule] = useState({ time: '', subject: '', location: '' });
  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editSchedule, setEditSchedule] = useState({ time: '', subject: '', location: '' });

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const now = new Date();
        const year = now.getFullYear().toString();
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const day = now.getDate().toString().padStart(2, '0');
        const hours = now.getHours().toString().padStart(2, '0');
        const baseDate = `${year}${month}${day}`;
        const baseTime = `${hours}00`;

        console.log(baseDate);
        console.log(baseTime);
        
        const response = await axios.get(`http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?serviceKey=3xP8EhJAhMFM1MeYqgQ9%2BFY76CPsUql1G0fWwuqYczzV5O5dE012yMoeQVzihB1i48lDrQ0mXfdd5lSWfHCQKQ%3D%3D&numOfRows=10&dataType=JSON&pageNo=1&base_date=${baseDate}&base_time=${baseTime}&nx=65&ny=114`, {
          // params: {
          //   serviceKey: '3xP8EhJAhMFM1MeYqgQ9%2BFY76CPsUql1G0fWwuqYczzV5O5dE012yMoeQVzihB1i48lDrQ0mXfdd5lSWfHCQKQ%3D%3D',
          //   numOfRows: 10,
          //   pageNo: 1,
          //   dataType: 'JSON',
          //   base_date: '20240524',
          //   base_time: '1430',
          //   nx: 65,
          //   ny: 114
          // }
        });
        if (response.data.response.body && response.data.response.body.items) {
          const items = response.data.response.body.items.item;
          const temperature = items.find(item => item.category === 'T1H').obsrValue;
          setWeatherData({ temperature });
        } else {
          console.error('Weather data not available');
        }
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSchedule({ ...newSchedule, [name]: value });
  };

  const handleAddSchedule = () => {
    const updatedSchedule = [...schedule, newSchedule];
    setSchedule(updatedSchedule);
    // 로컬 스토리지에 시간표를 저장합니다.
    localStorage.setItem('schedule', JSON.stringify(updatedSchedule));
    setNewSchedule({ time: '', subject: '', location: '' });
  };

  const handleEditSchedule = (index, updatedSchedule) => {
    const updatedScheduleList = [...schedule];
    updatedScheduleList[index] = updatedSchedule;
    setSchedule(updatedScheduleList);
    localStorage.setItem('schedule', JSON.stringify(updatedScheduleList));
  };
  
  // 수정 버튼 클릭 시 해당 시간표 수정 폼을 보여주는 함수
  const showEditForm = (index) => {
    setEditIndex(index);
    setEditSchedule(schedule[index]);
  };
  
  // 수정 폼에서 변경된 내용을 저장하는 함수
  const handleSaveEdit = () => {
    handleEditSchedule(editIndex, editSchedule);
    setEditIndex(null);
    setEditSchedule({ time: '', subject: '', location: '' });
  };
  
  // 수정 폼에서 변경된 내용을 취소하는 함수
  const handleCancelEdit = () => {
    setEditIndex(null);
    setEditSchedule({ time: '', subject: '', location: '' });
  };

  const handleDeleteSchedule = (index) => {
    const updatedScheduleList = schedule.filter((_, i) => i !== index);
    setSchedule(updatedScheduleList);
    localStorage.setItem('schedule', JSON.stringify(updatedScheduleList));
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div className='App'>
      <Container>
        <div id='main1'>
          <div className='row'>
            <div className='col-12 main-box'>
              <h3>안녕하세요!</h3>
              <h3>시험 공부 화이팅하세요!</h3>
              {/* {weatherData && (
                <div className='card main-card'>
                  <div className='card-body main-card-content'>
                    <h5 className='card-title'>날씨 데이터</h5>
                    <pre>{JSON.stringify(weatherData, null, 2)}</pre>
                  </div>
                </div>
              )} */}
              <div className='card main-card'>
                <div className='card-body main-card-content'>
                  {/*<img*/}
                  {/*    src='/hot.png'*/}
                  {/*    alt='hot'*/}
                  {/*    width='40%'*/}
                  {/*    height='40%'*/}
                  {/*    style={{float: 'right'}}*/}
                  {/*/>*/}
                  <img
                    src='/Aplus.png'
                    alt='Aplus'
                    width='40%'
                    height='40%'
                    style={{float: 'right'}}
                />
                  <h5 className='card-title'>한경대학교</h5>
                  <h6 className='card-text'>안성시, 석정동</h6>
                  {weatherData && <h3 className='card-text'>{weatherData.temperature}°C</h3>}
                </div>
              </div>
            </div>
            <div className='col-12 main-box'>
              <h3>오늘의 일정을 확인해보세요!</h3>
              <div className='card main-card'>
                <div className='card-body main-card-content'>
                  <img
                      src='/study1.png'
                      alt='study1'
                      width='40%'
                      height='40%'
                      style={{float: 'right'}}
                  />
                  <h6 className='card-text'>C++프로그래밍</h6>
                  <h6 className='card-text'>[시험] (퀴즈 #6) C++프로그래밍</h6>
                  <h6 className='card-text'>융합이산수학</h6>
                  <h6 className='card-text'>[과제] 12주차 과제</h6>
                  <a className='card-text' href='#'>
                    <a
                        src='/cold.png'
                        alt='cold'
                        width={'100'}
                        height={'100'}
                    />
                  </a>
                </div>
              </div>
            </div>
            {/* <div className='col-12 main-box'>
              <div className='card main-card'>
                <div className='card-body main-card-content'>
                  <h6 className='card-title'>오늘 시간표</h6>
                  <h6 className='card-text'>
                    1~2.5 C++프로그래밍 | 안재근/공학1 329
                  </h6>
                  <h6 className='card-text'>
                    4~5.5 융합이산수학 | 양근석/공학1 303
                  </h6>
                  <h6 className='card-text'>6~7 자료구조 | 김숙연/공학1 316</h6>
                  <h6 className='card-text'>
                    8~9.5 시스템프로그래밍 | 김숙연/공학1 316
                  </h6>
                </div>
              </div>
            </div> */}
            <div className='col-12 main-box'>
              <Button variant='secondary' onClick={toggleForm}>
                {showForm ? '시간표 추가 숨기기' : '시간표 추가'}
              </Button>
              {showForm && (
                <div>
                  <h3>시간표 추가</h3>
                  <Form>
                    <Form.Group controlId='formTime'>
                      <Form.Label>시간</Form.Label>
                      <Form.Control
                        type='text'
                        name='time'
                        value={newSchedule.time}
                        onChange={handleInputChange}
                        placeholder='예: 1~2.5'
                      />
                    </Form.Group>
                    <Form.Group controlId='formSubject'>
                      <Form.Label>과목</Form.Label>
                      <Form.Control
                        type='text'
                        name='subject'
                        value={newSchedule.subject}
                        onChange={handleInputChange}
                        placeholder='예: C++프로그래밍'
                      />
                    </Form.Group>
                    <Form.Group controlId='formLocation'>
                      <Form.Label>장소</Form.Label>
                      <Form.Control
                        type='text'
                        name='location'
                        value={newSchedule.location}
                        onChange={handleInputChange}
                        placeholder='예: 공학1 329'
                      />
                    </Form.Group>
                    <Button variant='primary' onClick={handleAddSchedule}>
                      추가
                    </Button>
                  </Form>
                </div>
              )}
              <h3>오늘 시간표</h3>
              {schedule.map((item, index) => (
                <div key={index} className='card main-card'>
                  <div className='card-body main-card-content'>
                    <h6 className='card-title'>{item.time}</h6>
                    <h6 className='card-text'>{item.subject} | {item.location}</h6>
                  </div>
                  <div>
                        <Button variant='primary' onClick={() => showEditForm(index)}>수정</Button>
                        <Button variant='danger' onClick={() => handleDeleteSchedule(index)}>삭제</Button>
                      </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Main1;

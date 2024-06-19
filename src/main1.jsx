import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Container, Form, Badge, Navbar, Nav, Row, Col} from "react-bootstrap";
import './main1.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHome, faSearch, faUser, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";  // Link를 임포트합니다.

function App() {
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const response = await axios.get('http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst?serviceKey=3xP8EhJAhMFM1MeYqgQ9%2BFY76CPsUql1G0fWwuqYczzV5O5dE012yMoeQVzihB1i48lDrQ0mXfdd5lSWfHCQKQ%3D%3D&dataType=JSON&numOfRows=10&pageNo=1&base_date=20240524&base_time=1430&nx=65&ny=114', {
                    params: {
                      serviceKey: '3xP8EhJAhMFM1MeYqgQ9%2BFY76CPsUql1G0fWwuqYczzV5O5dE012yMoeQVzihB1i48lDrQ0mXfdd5lSWfHCQKQ%3D%3D', // 여기에 실제 서비스 키를 입력하세요
                      numOfRows: 10,
                      pageNo: 1,
                      dataType: 'JSON',
                      base_date: '20240524', // 여기에 실제 날짜를 입력하세요
                      base_time: '1430', // 여기에 실제 시간을 입력하세요
                      nx: 65, // 여기에 실제 좌표를 입력하세요
                      ny: 114 // 여기에 실제 좌표를 입력하세요
                    }
                });
                setWeatherData(response.data);
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        };

        fetchWeatherData();
    }, []);

    return (
        <div className="App">
            {/* <Navbar bg="light">
                <Navbar.Brand className="mx-auto" href="#">HKMap</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link href="#"><img src="/mintori.png" alt="Profile" width="30" height="30" /></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar> */}
            <Container>
                <h3>안녕하세요!</h3>
                <h3>오늘은 더우니 조심하세요</h3>
                <div id="main1">
                    <div className="row">
                        <div className="col-12">
                            <div className="card iphone-widget">
                                <div className="card-body">
                                    <img src="/hot.png" alt="hot" width="40%" height="40%" style={{ float: "right" }} />
                                    
                                    <h5 className="card-title">한경대학교</h5>
                                    <h6 className="card-text">안성시, 석정동</h6>
                                    {weatherData && (
                                        <div>
                                            <h3>Weather Data:</h3>
                                            <pre>{JSON.stringify(weatherData, null, 2)}</pre>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <h3>오늘의 일정을 확인해보세요!</h3>
                        <div className="col-12">
                            <div className="card iphone-widget">
                                <div className="card-body">
                                    <img src="/study1.png" alt="study1" width="30%" height="30%" style={{ float: "right" }} />
                                    <h6 className="card-text">C++프로그래밍</h6>
                                    <h6 className="card-text">[시험] (퀴즈 #6) C++프로그래밍</h6>
                                    <a className="card-text" href="#"><a src="/cold.png" alt="cold" width={"100"} height={"100"} /></a>
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="card iphone-widget">
                                <div className="card-body">
                                    <h6 className="card-title">오늘 시간표</h6>
                                    <h6 className="card-text">1~2.5 C++프로그래밍 | 안재근/공학1 329</h6>
                                    <h6 className="card-text">4~5.5 융합이산수학 | 양근석/공학1 303</h6>
                                    <h6 className="card-text">6~7 자료구조 | 김숙연/공학1 316</h6>
                                    <h6 className="card-text">8~9.5 시스템프로그래밍 | 김숙연/공학1 316</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
            <nav className="navbar fixed-bottom navbar-light bg-light">
                <button className="navbar-brand" onClick={() => { /* handle button click event */ }}>Home</button>
                <button className="navbar-brand" onClick={() => { /* handle button click event */ }}>Map</button>
                <button className="navbar-brand" onClick={() => { /* handle button click event */ }}>MY</button>
            </nav>
            <footer className="footer mt-auto py-3 bg-light">
                <div className="container">
                    <div className="bg-white p-5 d-flex justify-content-center">
                        <Row>
                            <Col xs={3} className="text-center">
                                <FontAwesomeIcon icon={faSearch} size="lg"/>
                            </Col>
                            <Col xs={3} className="text-center">
                                <FontAwesomeIcon icon={faUser} size="lg"/>
                            </Col>
                            <Col xs={3} className="text-center">
                                <FontAwesomeIcon icon={faHome} size="lg"/>
                            </Col>
                            <Col xs={3} className="text-center">
                                <Link to="/community">
                                    <FontAwesomeIcon icon={faEnvelope} size="lg"/>
                                </Link>
                            </Col>
                        </Row>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default App;


import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser, faHome, faEnvelope, faMap, faUsers } from '@fortawesome/free-solid-svg-icons';
import { Routes, Route, useNavigate } from 'react-router-dom';

import Login from './component/Login.jsx';
import Main1 from './component/Main1.jsx';
import Profile from './component/Profile.jsx';
import Community from './component/Community.jsx';
import Map from './component/Map.jsx';
import PartnerList from "./PartnerList.jsx";

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

function App() {
    const navigate = useNavigate();

    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">HK-MAP</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/">메인화면</Nav.Link>
                        <Nav.Link href="/map">맛집지도</Nav.Link>
                        <Nav.Link href="/community">커뮤니티</Nav.Link>
                        <Nav.Link href="/profile">내 정보</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>

            {/* Routes */}
            <Routes>
                <Route path="/" element={<Main1 />} />
                <Route path="/map" element={<Map />} />
                <Route path="/community" element={<Community />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/login" element={<Login />} />
                <Route path="/partnerlist" element={<PartnerList />} />
            </Routes>

            {/* Bottom Navbar */}
            <div className="bottom-navbar fixed-bottom bg-white p-3">
                <div className="navbar-group d-flex justify-content-around">
                    <button className="navbar-button" onClick={() => navigate('/')}>
                        <FontAwesomeIcon icon={faHome} /> <p>메인화면</p>
                    </button>
                    <button className="navbar-button" onClick={() => navigate('/map')}>
                        <FontAwesomeIcon icon={faMap} /> <p>맛집</p>
                    </button>
                    <button className="navbar-button" onClick={() => navigate('/community')}>
                        <FontAwesomeIcon icon={faUsers} /> <p>커뮤니티</p>
                    </button>
                    <button className="navbar-button" onClick={() => navigate('/profile')}>
                        <FontAwesomeIcon icon={faUser} /> <p>내정보</p>
                    </button>
                </div>
            </div>
        </>
    );
}

export default App;

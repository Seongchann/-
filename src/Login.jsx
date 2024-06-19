import React, { useState, useEffect } from "react";
import { useNavigate} from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [currentTime, setCurrentTime] = useState(new Date());
    const navigate = useNavigate();

    const updateTime = () => {
        setCurrentTime(new Date());
    };

    useEffect(() => {
        const timerID = setInterval(updateTime, 1000); // 1초마다 현재 시간 업데이트
        return () => clearInterval(timerID); // 컴포넌트 언마운트 시 타이머 정리
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateUsername(username)) {
            alert('유효하지 않은 아이디 형식입니다. 이메일, 전화번호, 또는 이름을 입력해주세요.');
            return;
        }

        if (password.length < 4) {
            alert('비밀번호는 4글자 이상이어야 합니다.');
            return;
        }

        // 유효성 검사 통과 시 로그인 처리
        handleLogin();
    };

    const handleLogin = () => {
        // 로그인 처리를 수행하거나 필요한 작업을 수행할 수 있습니다.
        console.log('Username:', username);
        console.log('Password:', password);
        // 여기서 실제로는 서버로 요청을 보내 로그인을 처리해야 합니다.
        navigate('/main1');
    };

    const validateUsername = (input) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phonePattern = /^\d{3}\d{3,4}\d{4}$/;
        const namePattern = /^[a-zA-Z가-힣]+$/;

        return emailPattern.test(input) || phonePattern.test(input) || namePattern.test(input);
    };

    return (
        <>
            <div className={"login_box"}>
                <Container className="mt-5">
                    <div className="d-flex justify-content-start mt-3 mb-3"> {/* 시간 왼쪽 정렬 */}
                        <p className="time-text">{currentTime.toLocaleTimeString([], {
                            hour: 'numeric',
                            minute: '2-digit'
                        })}</p>
                    </div>


                    <h1 className="text-center mb-4">HK MAP</h1>
                    <h4 className="text-center mb-4">안녕하세요!</h4>
                    <div className="text-center mb-4">
                        <img src="/대지 1 사본 6.png" style={{width: "150px"}} alt="Login Logo" className="img-fluid"/>
                        <h5 className="text-center mb-3">아이디를 입력해주세요</h5>
                    </div>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Control
                                type="text"
                                placeholder="전화번호, 사용자 이름 또는 이메일"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="py-2 px-4 mb-2 rounded-pill"
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Control
                                type="password"
                                placeholder="비밀번호"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="py-2 px-4 mb-4 rounded-pill"
                            />
                        </Form.Group>

                        <Button
                            variant="primary"
                            type="submit"
                            className="py-2 px-4 rounded-pill btn-block"
                        >
                            로그인
                        </Button>
                    </Form>
                </Container>
            </div>
        </>
    );
};

export default Login;

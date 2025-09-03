import React, {useState} from "react";
import axios from "axios";
import {Box, Button, Snackbar, Stack, TextField, Typography} from "@mui/material";
import {User} from "./Login.js";
import {useNavigate} from "react-router-dom";

function Register() {
    const [user, setUser] = useState<User>({
        username: '',
        password: ''
    })
    const [passwordCheck, setPasswordCheck] = useState('');
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    {
        setUser({...user,
            [event.target.name] : event.target.value})
    }

    const handleChangePasswordCheck = (event: React.ChangeEvent<HTMLInputElement>) =>
    {
        setPasswordCheck(event.target.value);
    }

    const handleRegistration = () => {
        if (user.password !== passwordCheck) {
            setOpen(true);
            // 사용자에게 비밀번호가 일치하지 않는다는 메시지를 보여주는 것이 더 좋음
            // setMessage("비밀번호가 일치하지 않습니다.");
            return;
        }

        if (user.username === '' || user.password === '') {
            setOpen(true);
            // setMessage("사용자 이름과 비밀번호를 입력해주세요.");
            return;
        }

        axios.post("http://localhost:8080/register", user, {
            headers: {'Content-Type': "application/json"}
        })
            .then(res => {
                if(window.confirm("회원가입이 완료되었습니다. 로그인 창으로 이동합니까?")) {
                    navigate("/login");
                }
            })
            .catch(err => {
                setOpen(true);
                // 에러 메시지를 콘솔에 출력해 디버깅하는 것이 좋음
                console.error("회원가입 실패:", err);
            });
    }

    return (
        <>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column', // Arrange items vertically
                justifyContent: 'center', // Center items vertically
                alignItems: 'center', // Center items horizontally (optional, but often desired)
                minHeight: '100vh', // Ensure the container has enough height to center within
            }}>
                <Typography variant="h2" align="center" color="primary" fontWeight="medium">
                    회원가입
                </Typography>
                <Box sx={{m: 2}}/>
                <Stack spacing={2} alignItems="center" mt={2}>
                    <TextField
                        name="username"
                        label="사용자 이름"
                        onChange={handleChange}></TextField>
                    <TextField
                        type="password"
                        name="password"
                        label="비밀번호"
                        onChange={handleChange}></TextField>
                    <TextField
                        type="password"
                        name="passwordCheck"
                        label="비밀번호 확인"
                        onChange={handleChangePasswordCheck}></TextField>
                    <Button variant="outlined"
                            color="primary"
                            onClick={handleRegistration}>
                        회원가입하기
                    </Button>
                    <Snackbar open={open}
                              autoHideDuration={3000}
                              onClose={() => setOpen(false)}
                              message="회원가입 실패: 이름이나 비밀번호를 다시 확인해주세요."/>
                    </Stack>
            </Box>
        </>
    );
}

export default Register;
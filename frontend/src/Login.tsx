// src/Login.tsx
import React, {useState} from "react";
import {AppBar, Box, Button, Container, Link, Snackbar, Stack, TextField, Toolbar, Typography} from "@mui/material";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import api from "./api/axiosInstance.ts";

type User = {
    username: string;
    password: string;
}

function Login() {
    const [user, setUser] = useState<User>({
        username: '',
        password: ''
    })
    const [isAuthenticated, setAuth] = useState(false);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    {
        setUser({...user,
            [event.target.name] : event.target.value})
    }

    const handleLogin = () => {
        // 수정: axiosInstance를 사용하여 API 요청
        api.post("/login", user)
            .then(res => {
                const jwtToken = res.headers.authorization;
                if (jwtToken != null) {
                    localStorage.setItem("jwt", jwtToken);
                    setAuth(true);
                    navigate("/chatrooms"); // 로그인 성공 시 채팅방 목록으로 이동
                }
            })
            .catch(err => setOpen(true));
    }

    if(isAuthenticated) {
        // 이미 로그인한 상태라면 채팅방 목록으로 바로 리디렉션
        navigate("/chatrooms", {replace: true});
        return null;
    } else {
        return (
            // ... (기존 로그인 UI 코드)
            <>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh',
                }}>
                    <Typography variant="h2" align="center" color="primary" fontWeight="medium">
                        로그인하세요.
                    </Typography>
                    <Box sx={{ m: 2 }} />
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
                        <Button variant="outlined"
                                color="primary"
                                onClick={handleLogin}>
                            로그인
                        </Button>
                        <Snackbar open={open}
                                  autoHideDuration={3000}
                                  onClose={() => setOpen(false)}
                                  message="로그인 실패: 이름과 비밀번호를 확인해보세요."/>
                    </Stack>
                    <Box sx={{ m: 2 }} />
                    <Typography variant="body1">
                        아직 계정이 없으신가요?
                    </Typography>
                    <Link href="/register">
                        회원가입하기
                    </Link>
                </Box>
            </>
        );
    }
}

export type { User };
export default Login;
import React, {useState} from "react";
import {AppBar, Box, Button, Container, Link, Snackbar, Stack, TextField, Toolbar, Typography} from "@mui/material";
import axios from "axios";
import ChatroomListByUser from "./ChatroomListByUser.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

type User = {
    username: string;
    password: string;
}

const queryClient = new QueryClient();

function Login() {
    const [user, setUser] = useState<User>({
        username: '',
        password: ''
    })
    const [isAuthenticated, setAuth] = useState(false);
    const [open, setOpen] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    {
        setUser({...user,
        [event.target.name] : event.target.value})
    }

    const handleLogin = () => {
        axios.post("http://localhost:8080/login", user, {
            headers: {'Content-Type': "application/json"}
        })
            .then(res => {
                const jwtToken = res.headers.authorization;
                if (jwtToken != null) {
                    sessionStorage.setItem("jwt", jwtToken);
                    setAuth(true);
                }
            })
            .catch(err => setOpen(true));
    }

    if(isAuthenticated) {
        return (<div>
            <Typography variant="h3" align="center">
                만나서 반가워요, {user.username}님!
            </Typography>
            <QueryClientProvider client={queryClient}>
                <ChatroomListByUser username={user.username}/>
            </QueryClientProvider>
        </div>)
    } else {
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
                    <Link href="register">
                        회원가입하기
                    </Link>
                </Box>
            </>
        );
    }
}

export type { User };
export default Login;
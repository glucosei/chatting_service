import './App.css';
import axios from 'axios';
import {AppBar, Box, Button, Container, Toolbar, Typography} from "@mui/material";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import ChatroomList from "./ChatroomList.tsx";
import {useNavigate} from "react-router-dom";
import {selectChatRooms} from "./api/chatroom.ts"; // selectChatRooms 함수 임포트

function selectData() {
    axios.post('/testData', ["가", "나", "다"], {
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(function (res) {
            console.log(res);
        })
        .catch(function (err) {
            console.error(err);
        });
}

function login() {
    axios.post('/login', {
        username: 'admin',
        password: 'admin'
    }, {
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(function (res) {
            console.log(res);
        })
        .catch(function (err) {
            console.error(err);
        });
}

const queryClient = new QueryClient();

function App() {
    const navigate = useNavigate();

    // getRooms 함수를 fetchChatRooms로 변경하고 useNavigate를 사용하도록 수정
    const fetchChatRooms = async () => {
        try {
            const res = await selectChatRooms();
            console.log("채팅방 목록:", res);
            navigate('/chatrooms'); // API 호출 성공 시 채팅방 목록 페이지로 이동
        } catch (err) {
            console.error("채팅방 목록 조회 실패:", err);
        }
    };

    return (
        <Container maxWidth="xl">
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" align="center">
                        프론트엔드 테스트 페이지
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}>
                <Box sx={{ m: 2 }} />
                <Typography textAlign="center">
                    한번 아래 버튼을 눌러보시지
                </Typography>
                <Box sx={{ m: 2 }} />
                <Button sx={{ mt: 3, mb: 2, backgroundColor: "primary.main", color: "white"}} onClick={fetchChatRooms}>
                    조회
                </Button>
                <Button sx={{ mt: 3, mb: 2, backgroundColor: "primary.main", color: "white"}} onClick={() => navigate("/register")}>
                    회원가입 페이지로 이동
                </Button>
                <Button sx={{ mt: 3, mb: 2, backgroundColor: "primary.main", color: "white"}} onClick={() => navigate("/login")}>
                    로그인 페이지로 이동
                </Button>
                <QueryClientProvider client={queryClient}>
                    <ChatroomList />
                </QueryClientProvider>
            </Box>
        </Container>
    );
}

export default App;
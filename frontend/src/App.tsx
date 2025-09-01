import './App.css';
import axios from 'axios';
import {AppBar, Box, Button, Container, Toolbar, Typography} from "@mui/material";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import ChatroomList from "./ChatroomList.tsx";
import {useNavigate} from "react-router-dom";

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

function getRooms() {
    axios.get("http://localhost:8080/api/chatrooms")
        .then(function (res) {
            console.log(res);
        })
        .catch(function (err) {
            console.error(err);
        })
}

const queryClient = new QueryClient();

function App() {
    const navigate = useNavigate();
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
                <Button sx={{ mt: 3, mb: 2, backgroundColor: "primary.main", color: "white"}} onClick={() => getRooms()}>
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
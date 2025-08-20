import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import {AppBar, Box, Button, Container, Toolbar, Typography} from "@mui/material";

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

function App() {

    return (
        <Container>
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
                <Button sx={{ mt: 3, mb: 2, backgroundColor: "primary.main", color: "white"}} onClick={() => selectData()}>
                    조회
                </Button>
            </Box>
        </Container>
    );
}

export default App;
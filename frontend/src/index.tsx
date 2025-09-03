import React, {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./Login.tsx";
import Register from "./Register.tsx";
import ChatroomListPage from "./ChatroomListPage.tsx";
import ChatPage from "./ChatPage.tsx";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<App />}></Route>
                <Route path='/login' element={<Login />}></Route>
                <Route path='/register' element={<Register />}></Route>
                <Route path='/chatrooms' element={<ChatroomListPage />}></Route>
                <Route path='/chat/:chatroomTitle' element={<ChatPage />}></Route>
            </Routes>
        </BrowserRouter>
    </StrictMode>,
)
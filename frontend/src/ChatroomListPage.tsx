// src/ChatroomListPage.tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { selectChatRooms, createRoom, Chatroom } from './api/chatroom.ts';
import type { CreateRequest } from './api/chatroom.ts';

export default function ChatroomListPage() {
    const [chatrooms, setChatrooms] = useState<Chatroom[]>([]);
    const [newRoomTitle, setNewRoomTitle] = useState('');
    const navigate = useNavigate();

    const fetchChatrooms = async () => {
        try {
            const rooms = await selectChatRooms();
            setChatrooms(rooms);
        } catch (error) {
            console.error('채팅방 목록을 불러오는 데 실패했습니다.', error);
        }
    };

    useEffect(() => {
        fetchChatrooms();
    }, []);

    const handleCreateRoom = async () => {
        if (!newRoomTitle) return;
        const payload: CreateRequest = { title: newRoomTitle };
        try {
            const newRoom = await createRoom(payload);
            setChatrooms(prevRooms => [...prevRooms, newRoom]);
            setNewRoomTitle('');
        } catch (error) {
            console.error('채팅방 생성에 실패했습니다.', error);
        }
    };

    const handleJoinChatroom = (chatroomTitle: string) => {
        navigate(`/chat/${chatroomTitle}`);
    };

    return (
        <main className="container">
            <h2>채팅방 목록</h2>
            <div className="chatroom-create">
                <input
                    type="text"
                    value={newRoomTitle}
                    onChange={(e) => setNewRoomTitle(e.target.value)}
                    placeholder="새로운 채팅방 제목"
                />
                <button onClick={handleCreateRoom}>생성</button>
            </div>
            <div className="chatroom-list">
                {chatrooms.map(room => (
                    <div key={room.id} className="chatroom-item">
                        <h3>{room.title}</h3>
                        {/* 들어가기 버튼 추가 */}
                        <button onClick={() => handleJoinChatroom(room.title)}>
                            들어가기
                        </button>
                    </div>
                ))}
            </div>
        </main>
    );
}
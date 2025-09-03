import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from './api/chatroom.ts';
import type { ConnectRequest, ConnectResponse } from './api/chatroom.ts';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

export default function ChatPage() {
    const { chatroomTitle } = useParams<{ chatroomTitle: string }>();
    const [messages, setMessages] = useState<ConnectResponse[]>([]);
    const [messageInput, setMessageInput] = useState<string>('');
    const [username, setUsername] = useState<string>(''); // username 상태 추가
    const [isConnected, setIsConnected] = useState<boolean>(false);
    const stompClient = useRef<Client | null>(null);

    const fetchChatHistory = async () => {
        if (!chatroomTitle) return;
        const payload: ConnectRequest = { title: chatroomTitle };
        try {
            const history = await connect(payload);
            setMessages(history);
        } catch (error) {
            console.error('채팅 이력을 불러오는 데 실패했습니다.', error);
        }
    };

    const handleSendMessage = () => {
        if (isConnected && messageInput && stompClient.current) {
            const chatMessage = {
                user: username, // 상태 변수 username 사용
                message: messageInput
            };
            stompClient.current.publish({
                destination: `/pub/chat.sendMessage/${chatroomTitle}`,
                body: JSON.stringify(chatMessage),
            });
            setMessageInput('');
        }
    };

    useEffect(() => {
        fetchChatHistory();

        const jwtToken = localStorage.getItem('jwt');
        if (jwtToken) {
            try {
                // 토큰을 디코딩하여 페이로드에서 사용자명을 추출
                const tokenPayload = JSON.parse(atob(jwtToken.split('.')[1]));
                setUsername(tokenPayload.username); // username 상태에 저장
            } catch (error) {
                console.error('토큰 디코딩 실패', error);
            }
        }

        // 2. Client 객체 생성 시 connectHeaders에 토큰을 설정합니다.
        const client = new Client({
            webSocketFactory: () => {
                return new SockJS('http://localhost:8080/ws');
            },
            connectHeaders: {
                Authorization: `Bearer ${jwtToken}`,
            },
            onConnect: () => {
                console.log('Connected to WebSocket!');
                setIsConnected(true);
                client.subscribe(`/sub/chat/${chatroomTitle}`, (message) => {
                    const receivedMessage: ConnectResponse = JSON.parse(message.body);
                    setMessages((prevMessages) => [...prevMessages, receivedMessage]);
                });
            },
            onDisconnect: () => {
                setIsConnected(false);
            },
            reconnectDelay: 5000,
        });

        client.activate();
        stompClient.current = client;

        return () => {
            if (stompClient.current) {
                stompClient.current.deactivate();
            }
        };
    }, [chatroomTitle]);

    return (
        <main className="container">
            <h2>채팅방: {chatroomTitle}</h2>
            <div className="chat-history">
                {messages.map((chat, index) => (
                    <div key={index}>
                        <b>{chat.user}:</b> {chat.message}
                    </div>
                ))}
            </div>
            <div className="chat-input">
                <input
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && isConnected) {
                            handleSendMessage();
                        }
                    }}
                    placeholder={isConnected ? "메시지를 입력하세요" : "연결 중..."}
                    disabled={!isConnected}
                />
                <button onClick={handleSendMessage} disabled={!isConnected}>
                    {isConnected ? "전송" : "연결 중"}
                </button>
            </div>
        </main>
    );
}
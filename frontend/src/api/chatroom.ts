// src/api/chatroom.ts
import api from './axiosInstance.ts';

export type Chatroom = {
    id: number;
    title: string;
};

export type ConnectResponse = {
    user: string;
    message: string;
    // chatroom 객체는 프론트엔드에서 사용하지 않으므로 필드로 직접 정의하지 않아도 됩니다.
};

export type Chat = {
    id: number;
    user: string;
    message: string;
};

export type CreateRequest = {
    title: string;
};

export type ConnectRequest = {
    title: string;
};

export const createRoom = (payload: CreateRequest) => api.post<Chatroom>('/chatroom/create', payload).then(r => r.data);
export const connect = (payload: ConnectRequest) => api.post<ConnectResponse[]>('/chatroom/connect', payload).then(r => r.data);
export const selectChatRooms = () => api.post<Chatroom[]>('/chatroom/select').then(r => r.data);
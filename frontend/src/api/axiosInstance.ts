import axios from 'axios';

// API 요청을 보낼 axios 인스턴스 생성
const api = axios.create({
    // 백엔드 API의 기본 URL. CRA는 proxy 설정을 사용하므로, '/'로 설정
    baseURL: '/',
});

// 모든 요청에 JWT 토큰을 자동으로 포함시키는 요청 인터셉터
api.interceptors.request.use((config) => {
    // localStorage에서 'jwt'라는 이름으로 저장된 토큰을 가져옴
    const token = localStorage.getItem('jwt');

    // 토큰이 존재하면, 요청 헤더에 Authorization 헤더를 추가
    if (token) {
        config.headers = config.headers ?? {};
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

// 401 에러(인증 실패)가 발생했을 때 로그인 페이지로 리디렉션하는 응답 인터셉터
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // 서버가 401 에러를 반환하면
        if (error.response?.status === 401) {
            // localStorage에서 토큰을 제거
            localStorage.removeItem('jwt');
            // 로그인 페이지로 이동
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;
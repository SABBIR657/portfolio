import api from './base';

const AuthService = {
    login: (email, password) => api.post('/auth/login', {email, password}),
    getMe: () => api.get('/auth/me'),
}

export default AuthService;

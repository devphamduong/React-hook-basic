import axios from "../utils/axiosCustomize";

const createUser = (email, password, username, role, image) => {
    const data = new FormData();
    data.append('email', email);
    data.append('password', password);
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', image);
    return axios.post('api/v1/participant', data);
};

const getAllUsers = () => {
    return axios.get('api/v1/participant/all');
};

const updateUser = (id, username, role, image) => {
    const data = new FormData();
    data.append('id', id);
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', image);
    return axios.put('api/v1/participant', data);
};

const deleteUser = (id) => {
    return axios.delete('api/v1/participant', { data: { id: id } });
};

const getUserPaginate = (page, limit) => {
    return axios.get(`api/v1/participant?page=${page}&limit=${limit}`);
};

const login = (email, password) => {
    return axios.post('api/v1/login', { email, password });
};

const register = (email, username, password) => {
    return axios.post('api/v1/register', { email, username, password });
};

const getQuizByUser = () => {
    return axios.get('api/v1/quiz-by-participant');
};

const getDataQuiz = (id) => {
    return axios.get(`api/v1/questions-by-quiz?quizId=${id}`);
};

export { createUser, getAllUsers, updateUser, deleteUser, getUserPaginate, login, register, getQuizByUser, getDataQuiz };
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

const submitQuiz = (data) => {
    return axios.post(`api/v1/quiz-submit`, { ...data });
};

const createQuiz = (name, description, difficulty, image) => {
    const data = new FormData();
    data.append('description', description);
    data.append('name', name);
    data.append('difficulty', difficulty);
    data.append('quizImage', image);
    return axios.post('api/v1/quiz', data);
};

const getAllQuizAdmin = () => {
    return axios.get(`api/v1/quiz/all`);
};

const updateQuiz = (id, name, description, difficulty, image) => {
    const data = new FormData();
    data.append('id', id);
    data.append('description', description);
    data.append('name', name);
    data.append('difficulty', difficulty);
    data.append('quizImage', image);
    return axios.put('api/v1/quiz', data);
};

const deleteQuiz = (id) => {
    return axios.delete(`api/v1/quiz/${id}`);
};

const createNewQuestionForQuiz = (quiz_id, description, questionImage) => {
    const data = new FormData();
    data.append('quiz_id', quiz_id);
    data.append('description', description);
    data.append('questionImage', questionImage);
    return axios.post('api/v1/question', data);
};

const createNewAnswerForQuestion = (description, correct_answer, question_id) => {
    return axios.post('api/v1/answer', { description, correct_answer, question_id });
};

const getQuizWithQA = (quizId) => {
    return axios.get(`api/v1/quiz-with-qa/${quizId}`);
};

const upSertQA = (data) => {
    return axios.post('api/v1/quiz-upsert-qa', { ...data });
};

const assignQuizToUser = (quizId, userId) => {
    return axios.post('api/v1/quiz-assign-to-user', { quizId, userId });
};

export { createUser, getAllUsers, updateUser, deleteUser, getUserPaginate, login, register, getQuizByUser, getDataQuiz, submitQuiz, createQuiz, getAllQuizAdmin, updateQuiz, deleteQuiz, createNewQuestionForQuiz, createNewAnswerForQuestion, assignQuizToUser, getQuizWithQA, upSertQA };
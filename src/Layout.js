import App from './App';
import Admin from './components/Admin/Admin';
import HomePage from './components/Home/HomePage';
import ManageUser from './components/Admin/System/User/ManageUser';
import DashBoard from './components/Admin/System/DashBoard';
import Login from './components/Auth/Login';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Register from './components/Auth/Register';
import ListQuiz from './components/User/ListQuiz';
import DetailQuiz from './components/User/DetailQuiz';
import ManageQuiz from './components/Admin/System/Quiz/ManageQuiz';
import Questions from './components/Admin/System/Question/Questions';
import PrivateRoute from './routes/PrivateRoute';

const NotFound = () => {
    return (
        <div className='alert alert-danger container mt-3'>404. Not found data with your current URL</div>
    );
};

function Layout(props) {
    return (
        <>
            <Routes>
                <Route path='/' element={<App />}>
                    <Route index element={<HomePage />}></Route>
                    <Route path='user' element={
                        <PrivateRoute>
                            <ListQuiz />
                        </PrivateRoute>
                    }></Route>
                </Route>
                <Route path='/quiz:id' element={<DetailQuiz />}></Route>
                <Route path='/admin' element={
                    <PrivateRoute>
                        <Admin />
                    </PrivateRoute>
                }>
                    <Route index element={<DashBoard />}></Route>
                    <Route path='manage-users' element={<ManageUser />}></Route>
                    <Route path='manage-quizzes' element={<ManageQuiz />}></Route>
                    <Route path='manage-questions' element={<Questions />}></Route>
                </Route>
                <Route path='/login' element={<Login />}></Route>
                <Route path='/register' element={<Register />}></Route>
                <Route path='/t' element={<PrivateRoute />} />
                <Route path='*' element={<NotFound />}></Route>
            </Routes>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <ToastContainer />
        </>
    );
}

export default Layout;
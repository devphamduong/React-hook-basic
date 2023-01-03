import App from './App';
import User from './components/User/User';
import Admin from './components/Admin/Admin';
import HomePage from './components/Home/HomePage';
import ManageUser from './components/Admin/System/ManageUser';
import DashBoard from './components/Admin/System/DashBoard';
import Login from './components/Auth/Login';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function Layout(props) {
    return (
        <>
            <Routes>
                <Route path='/' element={<App />}>
                    <Route index element={<HomePage />}></Route>
                    <Route path='user' element={<User />}></Route>
                </Route>
                <Route path='/admin' element={<Admin />}>
                    <Route index element={<DashBoard />}></Route>
                    <Route path='manage-user' element={<ManageUser />}></Route>
                </Route>
                <Route path='/login' element={<Login />}></Route>
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
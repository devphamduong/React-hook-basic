import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import User from './components/User/User';
import Admin from './components/Admin/Admin';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './redux/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/Home/HomePage';
import ManageUser from './components/Admin/System/ManageUser';
import DashBoard from './components/Admin/System/DashBoard';
import Login from './components/Auth/Login';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    {/* <React.StrictMode> */}
    <BrowserRouter>
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
    </BrowserRouter>
    {/* </React.StrictMode> */}
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

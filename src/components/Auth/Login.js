import { useState } from 'react';
import './Login.scss';

function Login(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {

    };

    return (
        <div className="login-container">
            <div className='header'>
                Don't have an account yet?
            </div>
            <div className='title col-4 mx-auto'>
                Pham Chu Duong
            </div>
            <div className='welcome col-4 mx-auto'>
                Hello, who's this?
            </div>
            <div className='content-form col-4 mx-auto'>
                <div className='form-group'>
                    <label>Email</label>
                    <input value={email} onChange={(event) => setEmail(event.target.value)} type={'email'} className="form-control" />
                </div>
                <div className='form-group'>
                    <label>Password</label>
                    <input value={password} onChange={(event) => setPassword(event.target.value)} type={'password'} className="form-control" />
                </div>
                <span className='forgot-password'>Forgot password?</span>
                <div><button className='btn-submit' onClick={() => handleLogin()}>Login</button></div>
            </div>
        </div>
    );
}

export default Login;
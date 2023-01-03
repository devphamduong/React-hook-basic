import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login } from '../../services/apiServices';
import './Login.scss';

function Login(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        let data = await login(email, password);
        if (data && data.EC === 0) {
            toast.success(data.EM);
            navigate('/');
        } else if (data && data.EC !== 0) {
            toast.error(data.EM);
        }
    };

    return (
        <div className="login-container">
            <div className='header'>
                <span>Don't have an account yet?</span>
                <button>Sign up</button>
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
                <div>
                    <button className='btn-submit' onClick={() => handleLogin()}>Login</button>
                </div>
                <div className='text-center'>
                    <span className='back' onClick={() => { navigate('/'); }}>&#60;&#60; Go to Homepage</span>
                </div>
            </div>
        </div>
    );
}

export default Login;
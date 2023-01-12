import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { login } from '../../services/apiServices';
import { doLogin } from '../../redux/action/userAction';
import { ImSpinner10 } from 'react-icons/im';
import './Login.scss';

function Login(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = async () => {
        const isValidEmail = validateEmail(email);
        if (!isValidEmail) {
            toast.error("Invalid email!");
            return;
        }
        if (!password) {
            toast.error("Invalid password!");
            return;
        }
        setIsLoading(true);
        let data = await login(email, password);
        if (data && data.EC === 0) {
            dispatch(doLogin(data));
            toast.success(data.EM);
            setIsLoading(false);
            navigate('/');
        } else if (data && data.EC !== 0) {
            toast.error(data.EM);
            setIsLoading(false);
        }
    };

    const handleOnKeyDown = (event) => {
        if (event && event.key === 'Enter') {
            handleLogin();
        }
    };

    const validateEmail = (email) => {
        return String(email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    };

    const handleClickBtnRegister = () => {
        navigate('/register');
    };

    return (
        <div className="login-container">
            <div className='header'>
                <span>Don't have an account yet?</span>
                <button onClick={() => handleClickBtnRegister()}>Sign up</button>
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
                    <input value={password} onChange={(event) => setPassword(event.target.value)} onKeyDown={(event) => handleOnKeyDown()} type={'password'} className="form-control" />
                </div>
                <span className='forgot-password'>Forgot password?</span>
                <div>
                    <button className='btn-submit' disabled={isLoading} onClick={() => handleLogin()}>
                        {isLoading &&
                            <ImSpinner10 className='loader-icon' />
                        }
                        <span>Login</span>
                    </button>
                </div>
                <div className='text-center'>
                    <span className='back' onClick={() => { navigate('/'); }}>&#60;&#60; Go to Homepage</span>
                </div>
            </div>
        </div>
    );
}

export default Login;
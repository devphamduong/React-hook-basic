import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { login } from '../../services/apiServices';
import { doLogin } from '../../redux/action/userAction';
import { ImSpinner10 } from 'react-icons/im';
import { useTranslation } from 'react-i18next';
import './Login.scss';
import Language from '../Header/Language';

function Login(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { t } = useTranslation();

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
        console.log(event.key);
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
                <span>{t('login-register.no-account')}</span>
                <button onClick={() => handleClickBtnRegister()}>{t('login-register.btn-register')}</button>
                <Language />
            </div>
            <div className='title col-4 mx-auto'>
                Pham Chu Duong
            </div>
            <div className='welcome col-4 mx-auto'>
                {t('login-register.title-login')}
            </div>
            <div className='content-form col-4 mx-auto'>
                <div className='form-group'>
                    <label>Email</label>
                    <input value={email} onChange={(event) => setEmail(event.target.value)} type={'email'} className="form-control" />
                </div>
                <div className='form-group'>
                    <label>{t('login-register.password')}</label>
                    <input value={password} onChange={(event) => setPassword(event.target.value)} onKeyDown={(event) => handleOnKeyDown(event)} type={'password'} className="form-control" />
                </div>
                <span className='forgot-password'>{t('login-register.forgot')}</span>
                <div>
                    <button className='btn-submit' disabled={isLoading} onClick={() => handleLogin()}>
                        {isLoading &&
                            <ImSpinner10 className='loader-icon' />
                        }
                        <span>{t('login-register.btn-login')}</span>
                    </button>
                </div>
                <div className='text-center'>
                    <span className='back' onClick={() => { navigate('/'); }}>&#60;&#60; {t('login-register.go-home')}</span>
                </div>
            </div>
        </div>
    );
}

export default Login;
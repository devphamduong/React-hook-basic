import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { register } from '../../services/apiServices';
import { useTranslation } from 'react-i18next';
import Language from '../Header/Language';
import './Register.scss';

function Register() {

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleRegister = async () => {
        const isValidEmail = validateEmail(email);
        if (!isValidEmail) {
            toast.error("Invalid email!");
            return;
        }
        if (!password) {
            toast.error("Invalid password!");
            return;
        }
        let data = await register(email, username, password);
        if (data && data.EC === 0) {
            toast.success(data.EM);
            navigate('/login');
        } else if (data && data.EC !== 0) {
            toast.error(data.EM);
        }
    };

    const validateEmail = (email) => {
        return String(email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    };


    return (
        <div className="register-container">
            <div className='header'>
                <span>{t('login-register.has-account')}</span>
                <button onClick={() => { navigate('/login'); }}>{t('login-register.btn-login')}</button>
                <Language />
            </div>
            <div className='title col-4 mx-auto'>
                Pham Chu Duong
            </div>
            <div className='welcome col-4 mx-auto'>
                {t('login-register.title-register')}
            </div>
            <div className='content-form col-4 mx-auto'>
                <div className='form-group'>
                    <label>Email</label>
                    <input value={email} onChange={(event) => setEmail(event.target.value)} type={'email'} className="form-control" />
                </div>
                <div className='form-group'>
                    <label>{t('login-register.username')}</label>
                    <input value={username} onChange={(event) => setUsername(event.target.value)} type={'text'} className="form-control" />
                </div>
                <div className='form-group'>
                    <label>{t('login-register.password')}</label>
                    <input value={password} onChange={(event) => setPassword(event.target.value)} type={'password'} className="form-control" />
                </div>
                <div>
                    <button className='btn-submit' onClick={() => handleRegister()}>{t('login-register.btn-register')}</button>
                </div>
                <div className='text-center'>
                    <span className='back' onClick={() => { navigate('/'); }}>&#60;&#60; {t('login-register.go-home')}</span>
                </div>
            </div>
        </div>
    );
}

export default Register;
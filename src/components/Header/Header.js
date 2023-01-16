import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { logOut } from '../../services/apiServices';
import { doLogout } from '../../redux/action/userAction';
import './Header.scss';
import { DiReact } from 'react-icons/di';
import { toast } from 'react-toastify';
import Language from './Language';
import Profile from './Profile';
import { useEffect, useState } from 'react';

function Header() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const [showModalProfile, setShowModalProfile] = useState(false);

    const handleLogin = () => {
        navigate('/login');
    };

    const account = useSelector(state => state.user.account);
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);

    const handleLogOut = async () => {
        let res = await logOut(account.email, account.refresh_token);
        if (res && res.EC === 0) {
            //clear data redux
            dispatch(doLogout());
            navigate('/login');
        } else {
            toast.error(res.EM);
        }
    };

    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <NavLink to="/" className='navbar-brand'><DiReact className='brand-icon' /><span>Pham Chu Duong</span></NavLink>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavLink to="/" className='nav-link'>{t('header.home')}</NavLink>
                            <NavLink to="/user" className='nav-link'>{t('header.user')}</NavLink>
                            <NavLink to="/admin" className='nav-link'>{t('header.admin')}</NavLink>
                        </Nav>
                        <Nav>
                            {!isAuthenticated ?
                                <>
                                    <button className='btn-login' onClick={() => handleLogin()}>{t('header.login')}</button>
                                    <button className='btn-signup' onClick={() => { navigate('/register'); }}>{t('header.register')}</button>
                                </>
                                :
                                <NavDropdown title={t('header.settings')} id="basic-nav-dropdown">
                                    <NavDropdown.Item onClick={() => setShowModalProfile(true)}>{t('header.profile')}</NavDropdown.Item>
                                    <NavDropdown.Item onClick={() => handleLogOut()}>{t('header.logout')}</NavDropdown.Item>
                                </NavDropdown>
                            }
                            <Language />
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Profile show={showModalProfile} setShow={setShowModalProfile} account={account} setAccount={'abc'} />
        </>
    );
}

export default Header;
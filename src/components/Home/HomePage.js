import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import videoHomePage from '../../assets/video-homepage-1920.mp4';

function HomePage() {

    const account = useSelector(state => state.user.account);
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <div className="homepage-container">
            <video autoPlay loop muted>
                <source src={videoHomePage} type="video/mp4" />
            </video>
            <div className='homepage-content'>
                <div className='title-1'>
                    {t('homepage.title1')}
                </div>
                <div className='title-2'>
                    {t('homepage.title2')}
                </div>
                <div className='title-3'>
                    {!isAuthenticated ?
                        <button onClick={() => { navigate('/login'); }}>{t('homepage.title3.login')}</button>
                        :
                        <button onClick={() => { navigate('/user'); }}>{t('homepage.title3.quiz')}</button>
                    }
                </div>
            </div>
        </div>
    );
}

export default HomePage;
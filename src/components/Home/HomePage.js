import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import videoHomePage from '../../assets/video-homepage-1920.mp4';

function HomePage() {

    const account = useSelector(state => state.user.account);
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    const navigate = useNavigate();

    return (
        <div className="homepage-container">
            <video autoPlay loop muted>
                <source src={videoHomePage} type="video/mp4" />
            </video>
            <div className='homepage-content'>
                <div className='title-1'>
                    There's a better way to ask
                </div>
                <div className='title-2'>
                    You don't want to make a boring form. And your audience won't answer one. Create a typeform instead—and make everyone happy.
                </div>
                <div className='title-3'>
                    {!isAuthenticated ?
                        <button onClick={() => { navigate('/login'); }}>Get's started. It's free</button>
                        :
                        <button onClick={() => { navigate('/user'); }}>Doing Quiz Now</button>
                    }
                </div>
            </div>
        </div>
    );
}

export default HomePage;
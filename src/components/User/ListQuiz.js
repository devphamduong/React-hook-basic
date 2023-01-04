import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getQuizByUser } from '../../services/apiServices';
import './ListQuiz.scss';

function ListQuiz(props) {

    const [listQuiz, setListQuiz] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getQuizData();
    }, []);

    const getQuizData = async () => {
        let data = await getQuizByUser();
        if (data && data.EC === 0) {
            setListQuiz(data.DT);
        }
    };

    return (
        <div className='list-quiz-container container'>
            {listQuiz && listQuiz.length > 0 &&
                listQuiz.map((item, index) => {
                    return (
                        <div key={`quiz-${index}`} className="card" style={{ width: '18rem' }}>
                            <img src={`data:image/jpeg;base64,${item.image}`} className="card-img-top" />
                            <div className="card-body">
                                <h5 className="card-title">Quiz {index + 1}</h5>
                                <p className="card-text">{item.description}</p>
                                <button className="btn btn-primary" onClick={() => { navigate(`/quiz:${item.id}`, { state: { quizTitle: item.description } }); }}>Start now</button>
                            </div>
                        </div>
                    );
                })
            }
            {listQuiz && listQuiz.length === 0 &&
                <div>You don't have any quiz now</div>
            }
        </div>
    );
}

export default ListQuiz;
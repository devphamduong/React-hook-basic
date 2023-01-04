import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { getDataQuiz } from '../../services/apiServices';
import './DetailQuiz.scss';

function DetailQuiz(props) {

    const params = useParams();

    const formatedId = (id) => {
        return id.replace(/[^a-zA-Z0-9]/g, '');
    };
    const quizId = formatedId(params.id);
    const location = useLocation();
    const [listQuestion, setListQuestion] = useState([]);

    useEffect(() => {
        getQuestions();
    }, [quizId]);

    const getQuestions = async () => {
        let res = await getDataQuiz(quizId);
        if (res && res.EC === 0) {
            let raw = res.DT;
            let data = _.chain(raw)
                // Group the elements of Array based on `id` property
                .groupBy("id")
                // `key` is group's name (id), `value` is the array of objects
                .map((value, key) => {
                    let answers = [];
                    let questionDescription, image = null;
                    value.forEach((item, index) => {
                        if (index === 0) {
                            questionDescription = item.description;
                            image = item.image;
                        }
                        answers.push(item.answers);
                    });
                    return { questionId: key, answers, questionDescription, image };
                })
                .value();
        }
    };

    return (
        <div className='detail-quiz-container'>
            <div className='left'>
                <div className='title'>
                    Quiz {quizId}: {location?.state?.quizTitle}
                </div>
                <hr></hr>
                <div className='question-image'>
                    <img />
                </div>
                <div className='question-content'>
                    <div className='question'>
                        Question 1:  ?
                    </div>
                    <div className='answers'>
                        <div className='answer-child'>A. </div>
                        <div className='answer-child'>B. </div>
                    </div>
                </div>
                <div className='question-footer'>
                    <button className='btn btn-secondary'>Prev</button>
                    <button className='btn btn-primary'>Next</button>
                </div>
            </div>
            <div className='right'>
                count down
            </div>
        </div>
    );
}

export default DetailQuiz;
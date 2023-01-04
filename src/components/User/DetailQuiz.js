import _, { set } from 'lodash';
import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { getDataQuiz, submitQuiz } from '../../services/apiServices';
import './DetailQuiz.scss';
import ModalResult from './ModalResult';
import Question from './Question';

function DetailQuiz(props) {

    const params = useParams();
    const formatedId = (id) => {
        return id.replace(/[^a-zA-Z0-9]/g, '');
    };
    const quizId = formatedId(params.id);
    const location = useLocation();
    const [dataQuiz, setDataQuiz] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [btnPrevDisabled, setBtnPrevDisabled] = useState(false);
    const [btnNextDisabled, setBtnNextDisabled] = useState(false);
    const [isShowModalResult, setIsShowModalResult] = useState(false);
    const [dataModalResult, setDataModalResult] = useState({});

    useEffect(() => {
        getQuestions();
        if (currentQuestion === 0) {
            setBtnPrevDisabled(true);
        }
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
                        item.answers.isSelected = false;
                        answers.push(item.answers);
                    });
                    return { questionId: key, answers, questionDescription, image };
                })
                .value();
            setDataQuiz(data);
        }
    };

    const handlePrev = () => {
        if (currentQuestion - 1 < 0) {
            setBtnPrevDisabled(true);
            return;
        }
        setCurrentQuestion(currentQuestion - 1);
    };
    const handleNext = () => {
        if (dataQuiz && dataQuiz.length > currentQuestion + 1) {
            setCurrentQuestion(currentQuestion + 1);
            setBtnPrevDisabled(false);
        } else if (dataQuiz && dataQuiz.length === currentQuestion + 1) {
            setBtnNextDisabled(true);
        }
    };

    const handleCheckAns = (answerId, questionId) => {
        let dataQuizClone = _.cloneDeep(dataQuiz);
        let question = dataQuizClone.find(item => +item.questionId === +questionId);
        if (question && question.answers) {
            question.answers = question.answers.map((item) => {
                if (item.id === +answerId) {
                    item.isSelected = !item.isSelected;
                }
                return item;
            });
        }
        let index = dataQuizClone.findIndex(item => +item.questionId === +questionId);
        if (index > -1) {
            dataQuizClone[index] = question;
            setDataQuiz(dataQuizClone);
        }
    };

    const handleFinishQuiz = async () => {
        let payload = {
            quizId: +quizId,
            answers: []
        };
        let answers = [];
        if (dataQuiz && dataQuiz.length > 0) {
            dataQuiz.forEach((question) => {
                let questionId = +question.questionId;
                let userAnswerId = [];
                question.answers.forEach((answer) => {
                    if (answer.isSelected) {
                        userAnswerId.push(answer.id);
                    }
                });
                answers.push({
                    questionId: +questionId,
                    userAnswerId: userAnswerId
                });
            });
            payload.answers = answers;

            let res = await submitQuiz(payload);
            if (res && res.EC === 0) {
                setDataModalResult({
                    countCorrect: res.DT.countCorrect,
                    countTotal: res.DT.countTotal,
                    quizData: res.DT.quizData
                });
                setIsShowModalResult(true);
            }
        }
    };

    return (
        <div className='detail-quiz-container'>
            <div className='left'>
                <div className='title'>
                    Quiz {quizId}: {location?.state?.quizTitle}
                </div>
                <hr></hr>
                <div className='question-content'>
                    <Question dataQuiz={dataQuiz && dataQuiz.length > 0 ? dataQuiz[currentQuestion] : []} currentQuestion={currentQuestion} handleCheckAns={handleCheckAns} />
                </div>
                <div className='question-footer'>
                    <button className='btn btn-secondary' disabled={btnPrevDisabled} onClick={() => handlePrev()}>Prev</button>
                    <button className='btn btn-primary' disabled={btnNextDisabled} onClick={() => handleNext()}>Next</button>
                    <button className='btn btn-warning' disabled={btnNextDisabled} onClick={() => handleFinishQuiz()}>Finish</button>
                </div>
            </div>
            <div className='right'>
                count down
            </div>
            <ModalResult show={isShowModalResult} setShow={setIsShowModalResult} dataModalResult={dataModalResult} />
        </div>
    );
}

export default DetailQuiz;
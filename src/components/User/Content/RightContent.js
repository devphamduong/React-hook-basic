import CountDown from './CountDown';
import { useRef } from 'react';
import './RightContent.scss';

function RightContent(props) {

    const { dataQuiz, handleFinishQuiz, setCurrentQuestion } = props;
    const refDiv = useRef([]);

    const onTimesUp = () => {
        handleFinishQuiz();
    };

    const getClassQuestion = (question) => {
        if (question && question.answers.length > 0) {
            let isUnAnswered = question.answers.find(answer => answer.isSelected === true);
            if (isUnAnswered) {
                return "question answered";
            }
        }
        return "question";
    };

    const handleClickQuestion = (question, index) => {
        setCurrentQuestion(index);
        if (refDiv.current) {
            refDiv.current.forEach(item => {
                if (item && item.className === "question clicked") {
                    item.className = "question";
                }
            });
            if (question && question.answers.length > 0) {
                let isUnAnswered = question.answers.find(answer => answer.isSelected === true);
                if (isUnAnswered) {
                    return;
                }
            }
            refDiv.current[index].className = "question clicked";
        }
    };

    return (
        <>
            <div className="main-timer">
                <CountDown onTimesUp={onTimesUp} />
            </div>
            <div className='main-question'>
                {dataQuiz && dataQuiz.length > 0 &&
                    dataQuiz.map((item, index) => {
                        return (
                            <div key={`question-${index + 1}`} onClick={() => handleClickQuestion(item, index)} className={getClassQuestion(item)} ref={element => refDiv.current[index] = element}>{index + 1}</div>
                        );
                    })
                }
            </div>
        </>
    );
}

export default RightContent;
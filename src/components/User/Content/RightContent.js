import CountDown from './CountDown';
import './RightContent.scss';

function RightContent(props) {

    const { dataQuiz, handleFinishQuiz } = props;

    const onTimesUp = () => {
        handleFinishQuiz();
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
                            <div key={`question-${index + 1}`} className='question'>{index + 1}</div>
                        );
                    })
                }
            </div>
        </>
    );
}

export default RightContent;
import _ from "lodash";

function Question(props) {

    const { dataQuiz, currentQuestion, handleCheckAns } = props;
    if (_.isEmpty(dataQuiz)) {
        return (<></>);
    }

    const handleCheckBox = (event, answerId, questionId) => {
        handleCheckAns(answerId, questionId);
    };

    return (
        <>
            {dataQuiz.image ?
                <div className="question-image">
                    <img src={`data:image/jpeg;base64,${dataQuiz.image}`} />
                </div>
                :
                <div className="question-image">

                </div>
            }
            <div className='question'>
                Question {currentQuestion + 1}:  {dataQuiz.questionDescription}?
            </div>
            <div className='answers'>
                {dataQuiz.answers && dataQuiz.answers.length > 0 &&
                    dataQuiz.answers.map((item, index) => {
                        return (
                            <div key={`answer-${index}`} className='answer-child'>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" checked={item.isSelected} onChange={(event) => handleCheckBox(event, item.id, dataQuiz.questionId)} />
                                    <label className="form-check-label">
                                        {item.description}
                                    </label>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </>
    );
}

export default Question;
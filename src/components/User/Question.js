import _ from "lodash";

function Question(props) {

    const { dataQuiz, currentQuestion } = props;
    if (_.isEmpty(dataQuiz)) {
        return (<></>);
    }

    return (
        <>
            {dataQuiz.image &&
                <div className="question-image">
                    <img src={`data:image/jpeg;base64,${dataQuiz.image}`} />
                </div>
            }
            <div className='question'>
                Question {currentQuestion + 1}:  {dataQuiz.questionDescription}?
            </div>
            <div className='answers'>
                {dataQuiz.answers && dataQuiz.answers.length > 0 &&
                    dataQuiz.answers.map((item, index) => {
                        console.log(item);
                        return (
                            <div key={`answer-${index}`} className='answer-child'>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="" />
                                    <label class="form-check-label">
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
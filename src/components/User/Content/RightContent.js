import './RightContent.scss';

function RightContent(props) {

    const { dataQuiz } = props;

    return (
        <p>
            <div className="main-timer">

            </div>
            <div className='main-question'>
                {dataQuiz && dataQuiz.length > 0 &&
                    dataQuiz.map((item, index) => {
                        return (
                            <div className='question'>{index + 1}</div>
                        );
                    })
                }
            </div>
        </p>
    );
}

export default RightContent;
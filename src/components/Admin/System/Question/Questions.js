import { useState } from "react";
import Select from "react-select";
import { BsFillPatchPlusFill, BsFillPatchMinusFill } from 'react-icons/bs';
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import { RiImageAddFill } from 'react-icons/ri';
import { v4 as uuidv4 } from 'uuid';
import './Questions.scss';
import _ from "lodash";

function Questions(props) {

    const options = [
        { value: 'd', label: 'd' }
    ];
    const [selectedQuiz, setSelectedQuiz] = useState({});
    const [questions, setQuestions] = useState(
        [
            {
                id: uuidv4(),
                description: '',
                imageFile: '',
                imageName: '',
                answers: [
                    {
                        id: uuidv4(),
                        description: '',
                        isCorrect: false
                    }
                ]
            }
        ]
    );

    const handleOnChange = (questionId, answerId, type, value) => {
        if (type === 'QUESTION') {
            let copiedQuestions = _.cloneDeep(questions);
            let index = copiedQuestions.findIndex(item => item.id === questionId);
            if (index > -1) {
                copiedQuestions[index].description = value;
                setQuestions(copiedQuestions);
            }
        }
    };

    const handleOnChangeFileQuestion = (questionId, event) => {
        let copiedQuestions = _.cloneDeep(questions);
        let index = copiedQuestions.findIndex(item => item.id === questionId);
        if (index > -1 && event.target && event.target.files && event.target.files[0]) {
            copiedQuestions[index].imageFile = event.target.files[0];
            copiedQuestions[index].imageName = event.target.files[0].name;
            setQuestions(copiedQuestions);
        }
    };

    const handleAnswerQuestion = (type, questionId, answerId, value) => {
        let copiedQuestions = _.cloneDeep(questions);
        let index = copiedQuestions.findIndex(item => item.id === questionId);
        if (index > -1) {
            copiedQuestions[index].answers = copiedQuestions[index].answers.map(answer => {
                if (answer.id === answerId) {
                    if (type === 'CHECKBOX') {
                        answer.isCorrect = value;
                    } else if (type === 'INPUT') {
                        answer.description = value;
                    }
                }
                return answer;
            });
            setQuestions(copiedQuestions);
        }
    };

    const handleAddRemoveQuestion = (answerId, type) => {
        if (type === 'ADD') {
            const newQuestion =
            {
                id: uuidv4(),
                description: '',
                imageFile: '',
                imageName: '',
                answers: [
                    {
                        id: uuidv4(),
                        description: '',
                        isCorrect: false
                    }
                ]
            };
            setQuestions([...questions, newQuestion]);
        } else if (type === 'REMOVE') {
            let copiedQuestions = _.cloneDeep(questions);
            copiedQuestions = copiedQuestions.filter(item => item.id !== answerId);
            setQuestions(copiedQuestions);
        }
    };

    const handleAddRemoveAnswer = (questionId, answerId, type) => {
        let copiedQuestions = _.cloneDeep(questions);
        if (type === 'ADD') {
            const newAnswer =
            {
                id: uuidv4(),
                description: '',
                isCorrect: false
            };
            let index = copiedQuestions.findIndex(item => item.id === questionId);
            if (index > -1) {
                copiedQuestions[index].answers.push(newAnswer);
                setQuestions(copiedQuestions);
            }
        } else if (type === 'REMOVE') {
            let index = copiedQuestions.findIndex(item => item.id === questionId);
            if (index > -1) {
                copiedQuestions[index].answers = copiedQuestions[index].answers.filter(item => item.id !== answerId);
                setQuestions(copiedQuestions);
            }
        }
    };

    const handleSubmitQuestionForQuiz = () => {

    };

    return (
        <div className="questions-container">
            <div className="title">Manage Questions</div>
            <hr></hr>
            <div className="add-new-question">
                <div className="col-6 form-group">
                    <label className="mb-2">Select Quiz</label>
                    <Select value={selectedQuiz} onChange={setSelectedQuiz} options={options} placeholder='' />
                </div>
                <div className="mt-3 mb-2">Add questions:</div>
                {questions && questions.length > 0 &&
                    questions.map((question, index) => {
                        return (
                            <div key={question.id} className="question-main mb-4">
                                <div className="questions-content">
                                    <div className="form-floating description">
                                        <input type="text" className="form-control" placeholder="Quiz description..." value={question.description} onChange={(event) => handleOnChange(question.id, '', 'QUESTION', event.target.value)} />
                                        <label>Question {index + 1}</label>
                                    </div>
                                    <div className="group-upload">
                                        <label className="label-up" htmlFor={`${question.id}`}><RiImageAddFill /></label>
                                        <input type={'file'} id={`${question.id}`} hidden onChange={(event) => handleOnChangeFileQuestion(question.id, event)} />
                                        <span>
                                            {question.imageName ? question.imageName : '0 file is uploaded'}
                                        </span>
                                    </div>
                                    <div className="btn-add-question">
                                        <span onClick={() => handleAddRemoveQuestion('', 'ADD')}>
                                            <BsFillPatchPlusFill className="icon-add" />
                                        </span>
                                        {questions.length > 1 &&
                                            <span onClick={() => handleAddRemoveQuestion(question.id, 'REMOVE')}>
                                                <BsFillPatchMinusFill className="icon-remove" />
                                            </span>
                                        }
                                    </div>
                                </div>
                                {question.answers && question.answers.length > 0 &&
                                    question.answers.map((answer, index) => {
                                        return (
                                            <div key={answer.id}
                                                className="answers-content">
                                                <input className="form-check-input isCorrect" checked={answer.isCorrect} onChange={(event) => handleAnswerQuestion('CHECKBOX', question.id, answer.id, event.target.checked)} type="checkbox" />
                                                <div className="form-floating answer-name">
                                                    <input type="text" className="form-control" placeholder={`${answer.description} `} value={answer.description} onChange={(event) => handleAnswerQuestion('INPUT', question.id, answer.id, event.target.value)} />
                                                    <label>Answer {index + 1}</label>
                                                </div>
                                                <div className="btn-add-answer">
                                                    <span onClick={() => handleAddRemoveAnswer(question.id, '', 'ADD')}>
                                                        <AiFillPlusCircle className="icon-add" />
                                                    </span>
                                                    {question.answers.length > 1 &&
                                                        <span onClick={() => handleAddRemoveAnswer(question.id, answer.id, 'REMOVE')}>
                                                            <AiFillMinusCircle className="icon-remove" />
                                                        </span>
                                                    }
                                                </div>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        );
                    })
                }
                {questions && questions.length > 0 &&
                    <div>
                        <button onClick={() => handleSubmitQuestionForQuiz()} className="btn btn-warning">Save questions</button>
                    </div>
                }
            </div>
        </div>
    );
}

export default Questions;
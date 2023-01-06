import { useState } from "react";
import Select from "react-select";
import { BsFillPatchPlusFill, BsFillPatchMinusFill } from 'react-icons/bs';
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import './Questions.scss';

function Questions(props) {

    const options = [
        { value: 'd', label: 'd' }
    ];
    const [selectedQuiz, setSelectedQuiz] = useState('');
    const [description, setDescription] = useState('');

    return (
        <div className="questions-container">
            <div className="title">Manage Questions</div>
            <div className="add-new-question">
                <div className="col-6 form-group">
                    <label>Select Quiz</label>
                    <Select value={selectedQuiz} onChange={setSelectedQuiz} options={options} placeholder='Select Quiz...' />
                </div>
                <div className="mt-3">Add questions:</div>
                <div>
                    <div className="questions-content">
                        <div className="form-floating description">
                            <input type="text" className="form-control" placeholder="Quiz description..." value={description} onChange={(event) => setDescription(event.target.value)} />
                            <label>Description</label>
                        </div>
                        <div className="group-upload">
                            <label className="label-up">Upload Image</label>
                            <input type={'file'} hidden />
                            <span>0 file is uploaded</span>
                        </div>
                        <div className="btn-add-question">
                            <span><BsFillPatchPlusFill className="icon-add" /></span>
                            <span><BsFillPatchMinusFill className="icon-remove" /></span>
                        </div>
                    </div>
                    <div className="answers-content">
                        <input className="form-check-input isCorrect" type="checkbox" />
                        <div className="form-floating answer-name">
                            <input type="text" className="form-control" placeholder="Answer 1..." />
                            <label>Answer 1</label>
                        </div>
                        <div className="btn-add-answer">
                            <span><AiFillPlusCircle className="icon-add" /></span>
                            <span><AiFillMinusCircle className="icon-remove" /></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Questions;
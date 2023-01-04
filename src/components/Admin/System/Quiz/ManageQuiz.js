import './ManageQuiz.scss';
import Select from 'react-select';
import { useState } from 'react';
import { createQuiz } from '../../../../services/apiServices';
import { toast } from 'react-toastify';

function ManageQuiz(props) {

    const options = [
        { value: 'EASY', label: 'EASY' },
        { value: 'MEDIUM', label: 'MEDIUM' },
        { value: 'HARD', label: 'HARD' },
    ];
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [image, setImage] = useState(null);

    const handleOnChangeImg = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setImage(event.target.files[0]);
        }
    };

    const handleCreateQuiz = async () => {
        if (!name || !description) {
            toast.error('Name/Description is required!');
            return;
        }
        let res = await createQuiz(description, name, difficulty?.value, image);
        if (res && res.EC === 0) {
            setName('');
            setDescription('');
            toast.success(res.EM);
        } else {
            toast.error(res.EM);
        }
    };

    return (
        <div className='quiz-container'>
            <div className='title'>Manage Quizzes</div>
            <hr></hr>
            <div className='add-new'>
                <fieldset className="border rounded-3 p-3" >
                    <legend className="float-none w-auto px-3">Add new Quiz</legend>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" placeholder="Your quiz name" value={name} onChange={(event) => setName(event.target.value)} />
                        <label>Name</label>
                    </div>
                    <div className="form-floating">
                        <input type="text" className="form-control" placeholder="Quiz description..." value={description} onChange={(event) => setDescription(event.target.value)} />
                        <label>Description</label>
                    </div>
                    <div className='my-3'>
                        <Select defaultValue={difficulty} options={options}
                            onChange={setDifficulty} placeholder='Quiz difficulty...' />
                    </div>
                    <div className='more-actions'>
                        <label className='mb-1'>Upload Image</label>
                        <input type={'file'} className="form-control" onChange={(event) => handleOnChangeImg(event)} />
                    </div>
                    <div className='mt-3'>
                        <button className='btn btn-warning' onClick={() => handleCreateQuiz()}>Save</button>
                    </div>
                </fieldset>
            </div>
            <div className='list-detail'>

            </div>
        </div>
    );
}

export default ManageQuiz;
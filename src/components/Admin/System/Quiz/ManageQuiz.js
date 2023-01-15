import './ManageQuiz.scss';
import Select from 'react-select';
import { useState } from 'react';
import { createQuiz } from '../../../../services/apiServices';
import { toast } from 'react-toastify';
import TableQuiz from './TableQuiz';
import { useTranslation } from 'react-i18next';
import Accordion from 'react-bootstrap/Accordion';
import QuizQA from './QuizQA';
import AssignQuiz from './AssignQuiz';

function ManageQuiz(props) {

    const { t } = useTranslation();
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
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>{t('admin.feature.manage-quiz.title')}</Accordion.Header>
                    <Accordion.Body>
                        <div className='add-new'>
                            <fieldset className="border rounded-3 p-3" >
                                <legend className="float-none w-auto px-3">{t('admin.feature.manage-quiz.manage.title')}</legend>
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" placeholder="Your quiz name" value={name} onChange={(event) => setName(event.target.value)} />
                                    <label>{t('admin.feature.manage-quiz.manage.name')}</label>
                                </div>
                                <div className="form-floating">
                                    <input type="text" className="form-control" placeholder="Quiz description..." value={description} onChange={(event) => setDescription(event.target.value)} />
                                    <label>{t('admin.feature.manage-quiz.manage.description')}</label>
                                </div>
                                <div className='my-3'>
                                    <Select defaultValue={difficulty} options={options}
                                        onChange={setDifficulty} placeholder={t('admin.feature.manage-quiz.manage.difficulty')} />
                                </div>
                                <div className='more-actions'>
                                    <label className='mb-1'>{t('admin.feature.manage-quiz.manage.upload')}</label>
                                    <input type={'file'} className="form-control" onChange={(event) => handleOnChangeImg(event)} />
                                </div>
                                <div className='mt-3'>
                                    <button className='btn btn-warning' onClick={() => handleCreateQuiz()}>{t('admin.feature.manage-quiz.manage.btn-save')}</button>
                                </div>
                            </fieldset>
                        </div>
                        <div className='list-detail'>
                            <TableQuiz />
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>{t('admin.feature.manage-quiz.title-update')}</Accordion.Header>
                    <Accordion.Body>
                        <QuizQA />
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header>{t('admin.feature.manage-quiz.title-assign')}</Accordion.Header>
                    <Accordion.Body>
                        <AssignQuiz />
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    );
}

export default ManageQuiz;
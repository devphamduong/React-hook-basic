import _ from "lodash";
import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from 'react-icons/fc';
import { toast } from "react-toastify";
import Select from 'react-select';
import { useTranslation } from 'react-i18next';
import { updateQuiz } from '../../../../services/apiServices';

function ModalUpdateQuiz(props) {

    const { t } = useTranslation();
    const options = [
        { value: 'EASY', label: 'EASY' },
        { value: 'MEDIUM', label: 'MEDIUM' },
        { value: 'HARD', label: 'HARD' },
    ];
    const { show, setShow, dataQuiz, setDataQuiz, getAllQuiz } = props;
    const handleClose = () => {
        setShow(false);
        setName('');
        setDescription('');
        setDifficulty('');
        setImage('');
        setPreviewImg('');
        setDataQuiz({});
    };
    const handleShow = () => setShow(true);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [image, setImage] = useState('');
    const [previewImg, setPreviewImg] = useState('');

    useEffect(() => {
        if (!_.isEmpty(dataQuiz)) {
            setName(dataQuiz.name);
            setDescription(dataQuiz.description);
            let difficulty = options.find(option => option.value === dataQuiz.difficulty);
            setDifficulty(difficulty);
            if (dataQuiz.image) {
                setPreviewImg(`data:image/jpeg;base64,${dataQuiz.image}`);
                setImage(dataQuiz.image);
            }
        }
    }, [dataQuiz]);

    const handleUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImg(URL.createObjectURL(event.target.files[0]));
            setImage(event.target.files[0]);
        }
    };

    const handleUpdateQuiz = async () => {
        let data = await updateQuiz(dataQuiz.id, name, description, difficulty?.value, image);
        if (data && data.EC === 0) {
            toast.success(data.EM);
            handleClose();
            await getAllQuiz();
        } else if (data && data.EC !== 0) {
            toast.error(data.EM);
        }
    };

    return (
        <>
            <Modal className="modal-add-user" show={show} onHide={handleClose} size='xl' backdrop='static'>
                <Modal.Header closeButton>
                    <Modal.Title>{t('admin.feature.manage-quiz.manage.modal-update.title')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">{t('admin.feature.manage-quiz.manage.name')}</label>
                            <input type="text" className="form-control" value={name} onChange={(event) => setName(event.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">{t('admin.feature.manage-quiz.manage.description')}</label>
                            <input type="text" className="form-control" value={description} onChange={(event) => setDescription(event.target.value)} />
                        </div>
                        <div className="col-md-4">
                            <Select value={difficulty} options={options}
                                onChange={setDifficulty} placeholder={t('admin.feature.manage-quiz.manage.difficulty')} />
                        </div>
                        <div className="col-md-12">
                            <label className="form-label label-upload" htmlFor="labelUpload"><FcPlus /><span>{t('admin.feature.manage-quiz.manage.upload')}</span></label>
                            <input type="file" hidden id="labelUpload" onChange={(event) => handleUploadImage(event)} />
                        </div>
                        <div className="col-md-12 img-preview">
                            {previewImg ?
                                <img src={previewImg} alt="previewImage" />
                                :
                                <span>{t('admin.feature.manage-quiz.manage.modal-update.preview-img')}</span>
                            }
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        {t('admin.feature.manage-quiz.manage.modal-update.btn-close')}
                    </Button>
                    <Button variant="primary" onClick={() => handleUpdateQuiz()}>
                        {t('admin.feature.manage-quiz.manage.modal-update.btn-save')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalUpdateQuiz;
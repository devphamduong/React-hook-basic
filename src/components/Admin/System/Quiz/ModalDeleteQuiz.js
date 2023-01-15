import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { deleteQuiz } from '../../../../services/apiServices';

function ModalDeleteQuiz(props) {

    const { t } = useTranslation();
    const { show, setShow, dataQuiz, getAllQuiz } = props;

    const handleClose = () => {
        setShow(false);
    };

    const handleDeleteQuiz = async () => {
        let res = await deleteQuiz(dataQuiz.id);
        if (res && res.EC === 0) {
            toast.success(res.EM);
            handleClose();
            getAllQuiz();
        } else if (res && res.EC !== 0) {
            toast.error(res.EM);
        }
    };

    return (
        <>
            <Modal show={show} onHide={handleClose} backdrop='static'>
                <Modal.Header closeButton>
                    <Modal.Title>{t('admin.feature.manage-quiz.manage.modal-delete.title')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{t('admin.feature.manage-quiz.manage.modal-delete.question')}<b>{dataQuiz && dataQuiz.id ? dataQuiz.id : ''}</b>?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        {t('admin.feature.manage-quiz.manage.modal-delete.btn-cancel')}
                    </Button>
                    <Button variant="danger" onClick={() => handleDeleteQuiz()}>
                        {t('admin.feature.manage-quiz.manage.modal-delete.btn-delete')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteQuiz;
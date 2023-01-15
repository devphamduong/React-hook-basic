import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useTranslation } from 'react-i18next';

function ModalResult(props) {
    const { show, setShow, dataModalResult } = props;
    const { t } = useTranslation();

    const handleClose = () => {
        setShow(false);
    };

    return (
        <>
            <Modal show={show} onHide={handleClose} backdrop='static'>
                <Modal.Header closeButton>
                    <Modal.Title>{t('user.detail-quiz.modal-result.title')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>{t('user.detail-quiz.modal-result.total-question')}<b>{dataModalResult.countTotal}</b></div>
                    <div>{t('user.detail-quiz.modal-result.total-correct-answer')}<b>{dataModalResult.countCorrect}</b></div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        {t('user.detail-quiz.modal-result.show-answer')}
                    </Button>
                    <Button variant="danger" onClick={handleClose}>
                        {t('user.detail-quiz.modal-result.btn-close')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalResult;
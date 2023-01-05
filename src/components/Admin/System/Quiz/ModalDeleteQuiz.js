import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { deleteQuiz } from '../../../../services/apiServices';

function ModalDeleteQuiz(props) {

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
                    <Modal.Title>Confirm delete quiz</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure to delete this quiz: id = <b>{dataQuiz && dataQuiz.id ? dataQuiz.id : ''}</b></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={() => handleDeleteQuiz()}>
                        Delete quiz
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteQuiz;
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { deleteUser } from '../../../services/apiServices';

function ModalDeleteUser(props) {
    const { show, setShow, userUpdate } = props;
    const handleClose = () => {
        setShow(false);
    };

    const handleDeleteUser = async () => {
        let res = await deleteUser(userUpdate.id);
        if (res && res.EC === 0) {
            toast.success(res.EM);
            handleClose();
            await props.fetchAllUsers();
        } else if (res && res.EC !== 0) {
            toast.error(res.EM);
        }
    };

    return (
        <>
            <Modal show={show} onHide={handleClose} backdrop='static'>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm delete user</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure to delete this user: email = <b>{userUpdate && userUpdate.email ? userUpdate.email : ''}</b></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={() => handleDeleteUser()}>
                        Delete user
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteUser;
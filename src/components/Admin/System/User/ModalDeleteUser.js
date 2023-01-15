import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { deleteUser } from '../../../../services/apiServices';

function ModalDeleteUser(props) {
    const { show, setShow, userUpdate, currentPage, setCurrentPage } = props;
    const { t } = useTranslation();

    const handleClose = () => {
        setShow(false);
    };

    const handleDeleteUser = async () => {
        let res = await deleteUser(userUpdate.id);
        if (res && res.EC === 0) {
            toast.success(res.EM);
            handleClose();
            setCurrentPage(1);
            await props.fetchAllUsersPaginate(1);
        } else if (res && res.EC !== 0) {
            toast.error(res.EM);
        }
    };

    return (
        <>
            <Modal show={show} onHide={handleClose} backdrop='static'>
                <Modal.Header closeButton>
                    <Modal.Title>{t('admin.feature.manage-user.modal-delete.title')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{t('admin.feature.manage-user.modal-delete.question')}<b>{userUpdate && userUpdate.email ? userUpdate.email : ''}</b>?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        {t('admin.feature.manage-user.modal-delete.btn-cancel')}
                    </Button>
                    <Button variant="danger" onClick={() => handleDeleteUser()}>
                        {t('admin.feature.manage-user.modal-delete.btn-delete')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteUser;
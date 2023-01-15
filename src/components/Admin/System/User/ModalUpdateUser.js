import _ from "lodash";
import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from 'react-icons/fc';
import { toast } from "react-toastify";
import { useTranslation } from 'react-i18next';
import { updateUser } from '../../../../services/apiServices';

function ModalUpdateUser(props) {

    const { show, setShow, userUpdate, resetUpdateData, currentPage } = props;
    const { t } = useTranslation();
    const handleShow = () => setShow(true);
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('USER');
    const [image, setImage] = useState('');
    const [previewImg, setPreviewImg] = useState('');

    const handleClose = () => {
        setShow(false);
        setEmail('');
        setPassword('');
        setUsername('');
        setRole('USER');
        setPreviewImg('');
        setImage('');
        resetUpdateData();
    };

    useEffect(() => {
        if (!_.isEmpty(userUpdate)) {
            setEmail(userUpdate.email);
            setPassword(`Don't even think about that!`);
            setUsername(userUpdate.username);
            setRole(userUpdate.role);
            if (userUpdate.image) {
                setPreviewImg(`data:image/jpeg;base64,${userUpdate.image}`);
            }
        }
    }, [userUpdate]);

    const handleUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImg(URL.createObjectURL(event.target.files[0]));
            setImage(event.target.files[0]);
        }
    };

    const handleUpdateUser = async () => {
        let data = await updateUser(userUpdate.id, username, role, image);
        if (data && data.EC === 0) {
            toast.success(data.EM);
            handleClose();
            await props.fetchAllUsersPaginate(currentPage);
        } else if (data && data.EC !== 0) {
            toast.error(data.EM);
        }
    };

    return (
        <>
            <Modal className="modal-add-user" show={show} onHide={handleClose} size='xl' backdrop='static'>
                <Modal.Header closeButton>
                    <Modal.Title>{t('admin.feature.manage-user.modal-update.title')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <input type="email" disabled className="form-control" value={email} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">{t('admin.feature.manage-user.modal-update.username')}</label>
                            <input type="text" className="form-control" value={username} onChange={(event) => setUsername(event.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">{t('admin.feature.manage-user.modal-update.title')}</label>
                            <input type="password" disabled className="form-control" value={password} />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">{t('admin.feature.manage-user.modal-update.role')}</label>
                            <select className="form-select" value={role} onChange={(event) => setRole(event.target.value)}>
                                <option value={'USER'}>USER</option>
                                <option value={'ADMIN'}>ADMIN</option>
                            </select>
                        </div>
                        <div className="col-md-12">
                            <label className="form-label label-upload" htmlFor="labelUpload"><FcPlus /><span>{t('admin.feature.manage-user.modal-update.btn-upload')}</span></label>
                            <input type="file" hidden id="labelUpload" onChange={(event) => handleUploadImage(event)} />
                        </div>
                        <div className="col-md-12 img-preview">
                            {previewImg ?
                                <img src={previewImg} alt="previewImage" />
                                :
                                <span>{t('admin.feature.manage-user.modal-update.preview-img')}</span>
                            }
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        {t('admin.feature.manage-user.modal-update.btn-close')}
                    </Button>
                    <Button variant="primary" onClick={() => handleUpdateUser()}>
                        {t('admin.feature.manage-user.modal-update.btn-save')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalUpdateUser;
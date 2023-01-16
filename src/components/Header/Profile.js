import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from 'react-icons/fc';
import { useTranslation } from 'react-i18next';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useDispatch } from 'react-redux';
import './Profile.scss';
import { doUpdateProfile } from '../../redux/action/userAction';
import _ from 'lodash';
import { ModalFooter } from 'react-bootstrap';
import { updateProfile, changePassword } from '../../services/apiServices';
import { toast } from 'react-toastify';

function Profile(props) {

    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { show, setShow, account } = props;
    const [username, setUsername] = useState('');
    const [image, setImage] = useState('');
    const [previewImg, setPreviewImg] = useState('');
    const [tab, setTab] = useState('profile');
    const [oldPass, setOldPass] = useState('');
    const [newPass, setNewPass] = useState('');

    useEffect(() => {
        if (!_.isEmpty(account)) {
            setUsername(account.username);
            if (account.image) {
                setPreviewImg(`data:image/jpeg;base64,${account.image}`);
            }
        }
    }, []);

    const handleUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImg(URL.createObjectURL(event.target.files[0]));
            console.log(event.target.files[0]);
            setImage(event.target.files[0]);
        }
    };

    const handleClose = () => {
        setShow(false);
    };

    const toBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    };

    const handleUpdateUserProfile = async () => {
        let res = await updateProfile(username, image);
        if (res && res.EC === 0) {
            let updateAccount = _.cloneDeep(account);
            updateAccount = {
                ...updateAccount,
                username: username,
                image: toBase64(image)
            };
            dispatch(doUpdateProfile(updateAccount));
            toast.success(res.EM);
        } else {
            toast.error(res.EM);
        }
    };

    const handleChangeUserPassword = async () => {
        let res = await changePassword(oldPass, newPass);
        if (res && res.EC === 0) {
            setOldPass('');
            setNewPass('');
            toast.success(res.EM);
        } else {
            toast.error(res.EM);
        }
    };

    return (
        <>
            <Modal className="modal-add-user" show={show} onHide={handleClose} size='xl' backdrop='static'>
                <Modal.Header closeButton>
                    <Modal.Title>{t('admin.feature.manage-user.modal-update.title')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Tabs
                        activeKey={tab}
                        id="controlled-tab-example"
                        className="mb-3"
                        onSelect={(k) => setTab(k)}
                    >
                        <Tab eventKey="profile" title="Profile">
                            <form className="row g-3">
                                <div className="col-md-6">
                                    <label className="form-label">Email</label>
                                    <input type="email" className="form-control" value={account.email} disabled />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">{t('admin.feature.manage-user.modal-update.username')}</label>
                                    <input type="text" className="form-control" value={username} onChange={(event) => setUsername(event.target.value)} />
                                </div>
                                <div className="col-md-4">
                                    <label className="form-label">{t('admin.feature.manage-user.modal-update.role')}</label>
                                    <select className="form-select" value={account.role} disabled>
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
                        </Tab>
                        <Tab eventKey="password" title="Password">
                            <form className="row g-3 form-password">
                                <div className="col-md-6">
                                    <label className="form-label">Old password</label>
                                    <input type="password" className="form-control" value={oldPass} onChange={(event) => setOldPass(event.target.value)} />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">New password</label>
                                    <input type="password" className="form-control" value={newPass} onChange={(event) => setNewPass(event.target.value)} />
                                </div>
                            </form>
                        </Tab>
                        <Tab eventKey="quiz" title="Quiz History">
                            <form className="row g-3 form-quiz-history">
                                <div className="col-md-6">
                                    <label className="form-label">Old password</label>
                                    <input type="email" className="form-control" value={account.email} disabled />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">New password</label>
                                    <input type="text" className="form-control" value={account.username} onChange={(event) => setUsername(event.target.value)} />
                                </div>
                            </form>
                        </Tab>
                    </Tabs>
                </Modal.Body>
                {tab === 'profile' &&
                    <ModalFooter>
                        <Button variant="secondary" onClick={handleClose}>
                            {t('admin.feature.manage-user.modal-update.btn-close')}
                        </Button>
                        <Button variant="primary" onClick={() => handleUpdateUserProfile()}>
                            {t('admin.feature.manage-user.modal-update.btn-save')}
                        </Button>
                    </ModalFooter>}
                {tab === 'password' &&
                    <ModalFooter>
                        <Button variant="secondary" onClick={handleClose}>
                            {t('admin.feature.manage-user.modal-update.btn-close')}
                        </Button>
                        <Button variant="primary" onClick={() => handleChangeUserPassword()}>
                            Đổi mật khẩu
                        </Button>
                    </ModalFooter>}
                {tab === 'quiz' &&
                    <ModalFooter>
                        <Button variant="secondary" onClick={handleClose}>
                            {t('admin.feature.manage-user.modal-update.btn-close')}
                        </Button>
                    </ModalFooter>}
            </Modal>
        </>
    );
}

export default Profile;
import { useState, useEffect } from 'react';
import ModalCreateUser from './ModalCreateUser';
import { FcPlus } from 'react-icons/fc';
import './ManageUser.scss';
import TableUser from './TableUser';
import { getAllUsers } from "../../../services/apiServices";
import ModalUpdateUser from './ModalUpdateUser';
import ModalViewUser from './ModalViewUser';

function ManageUser(props) {

    const [showModalCreate, setShowModalCreate] = useState(false);
    const [showModalUpdate, setShowModalUpdate] = useState(false);
    const [showModalView, setShowModalView] = useState(false);
    const [listUsers, setListUsers] = useState([]);
    const [userUpdate, setUserUpdate] = useState({});

    useEffect(() => {
        fetchAllUsers();
    }, []);

    const fetchAllUsers = async () => {
        let res = await getAllUsers();
        if (res.EC === 0) {
            setListUsers(res.DT);
        }
    };

    const handleClickBtnUpdate = (user) => {
        setShowModalUpdate(true);
        setUserUpdate(user);
    };

    const handleClickBtnView = (user) => {
        setShowModalView(true);
        setUserUpdate(user);
    };

    const resetUpdateData = () => {
        setUserUpdate({});
    };

    return (
        <>
            <div className="manage-user-container">
                <div className="title">Manage User</div>
                <div className="manage-user-content">
                    <div>
                        <button className='btn-add-new btn btn-primary' onClick={() => setShowModalCreate(true)}><FcPlus /><span>Add new user</span></button>
                    </div>
                    <div className='table-user'>
                        <TableUser listUsers={listUsers} handleClickBtnUpdate={handleClickBtnUpdate} handleClickBtnView={handleClickBtnView} />
                    </div>
                    <ModalCreateUser show={showModalCreate} setShow={setShowModalCreate} fetchAllUsers={fetchAllUsers} />
                    <ModalUpdateUser show={showModalUpdate} setShow={setShowModalUpdate} fetchAllUsers={fetchAllUsers} userUpdate={userUpdate} resetUpdateData={resetUpdateData} />
                    <ModalViewUser show={showModalView} setShow={setShowModalView} userUpdate={userUpdate} resetUpdateData={resetUpdateData} />
                </div>
            </div>
        </>
    );
}

export default ManageUser;
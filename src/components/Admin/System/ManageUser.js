import { useState, useEffect } from 'react';
import ModalCreateUser from './ModalCreateUser';
import { FcPlus } from 'react-icons/fc';
import './ManageUser.scss';
import TableUser from './TableUser';
import { getAllUsers } from "../../../services/apiServices";

function ManageUser(props) {

    const [showModal, setShowModal] = useState(false);
    const [listUsers, setListUsers] = useState([]);

    useEffect(() => {
        fetchAllUsers();
    }, []);

    const fetchAllUsers = async () => {
        let res = await getAllUsers();
        if (res.EC === 0) {
            setListUsers(res.DT);
        }
    };

    return (
        <>
            <div className="manage-user-container">
                <div className="title">Manage User</div>
                <div className="manage-user-content">
                    <div>
                        <button className='btn-add-new btn btn-primary' onClick={() => setShowModal(true)}><FcPlus /><span>Add new user</span></button>
                    </div>
                    <div className='table-user'>
                        <TableUser listUsers={listUsers} />
                    </div>
                    <ModalCreateUser show={showModal} setShow={setShowModal} fetchAllUsers={fetchAllUsers} />
                </div>
            </div>
        </>
    );
}

export default ManageUser;
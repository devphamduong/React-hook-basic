import { useState } from 'react';
import ModalCreateUser from './ModalCreateUser';
import { FcPlus } from 'react-icons/fc';
import './ManageUser.scss';
import TableUser from './TableUser';

function ManageUser(props) {

    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div className="manage-user-container">
                <div className="title">Manage User</div>
                <div className="manage-user-content">
                    <div>
                        <button className='btn-add-new btn btn-primary' onClick={() => setShowModal(true)}><FcPlus /><span>Add new user</span></button>
                    </div>
                    <div className='table-user'>
                        <TableUser />
                    </div>
                    <ModalCreateUser show={showModal} setShow={setShowModal} />
                </div>
            </div>
        </>
    );
}

export default ManageUser;
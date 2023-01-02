import { useState } from 'react';
import ModalCreateUser from './ModalCreateUser';
import './ManageUser.scss';

function ManageUser(props) {



    return (
        <>
            <div className="manage-user-container">
                <div className="title">Manage User</div>
                <div className="manage-user-content">
                    <div>
                        <button>Add new user</button>
                    </div>
                    <div>
                        table
                    </div>
                    <ModalCreateUser />
                </div>
            </div>
        </>
    );
}

export default ManageUser;
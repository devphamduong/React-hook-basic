import { useState } from 'react';
import ModalCreateUser from './ModalCreateUser';

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
                        <ModalCreateUser />
                    </div>
                </div>
            </div>
        </>
    );
}

export default ManageUser;
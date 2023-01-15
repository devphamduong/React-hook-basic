import Select from 'react-select';
import { useState, useEffect } from 'react';
import { getAllQuizAdmin, getAllUsers, assignQuizToUser } from "../../../../services/apiServices";
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

function AssignQuiz() {

    const { t } = useTranslation();
    const [listQuiz, setListQuiz] = useState([]);
    const [selectedQuiz, setSelectedQuiz] = useState({});
    const [listUser, setListUser] = useState([]);
    const [selectedUser, setSelectedUser] = useState({});

    useEffect(() => {
        getAllQuiz();
        getAllUser();
    }, []);

    const getAllQuiz = async () => {
        let res = await getAllQuizAdmin();
        if (res && res.EC === 0) {
            let newQuiz = res.DT.map(item => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.name}`
                };
            });
            setListQuiz(newQuiz);
        }
    };

    const getAllUser = async () => {
        let res = await getAllUsers();
        if (res && res.EC === 0) {
            let newUsers = res.DT.map(item => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.username} - ${item.email}`
                };
            });
            setListUser(newUsers);
        }
    };

    const handleAssignQuizToUser = async () => {
        let res = await assignQuizToUser(selectedQuiz.value, selectedUser.value);
        if (res && res.EC === 0) {
            toast.success(res.EM);
        } else if (res && res.EC !== 0) {
            toast.error(res.EM);
        }
    };

    return (
        <div className="assign-quiz-container row">
            <div className="col-6 form-group">
                <label className="mb-2">{t('admin.feature.manage-quiz.assign.title-select')}</label>
                <Select value={selectedQuiz} onChange={setSelectedQuiz} options={listQuiz} placeholder='' />
            </div>
            <div className="col-6 form-group">
                <label className="mb-2">{t('admin.feature.manage-quiz.assign.title-user')}</label>
                <Select value={selectedUser} onChange={setSelectedUser} options={listUser} placeholder='' />
            </div>
            <div>
                <button onClick={() => handleAssignQuizToUser()} className='btn btn-warning mt-3'>{t('admin.feature.manage-quiz.assign.btn-assign')}</button>
            </div>
        </div>
    );
}

export default AssignQuiz;
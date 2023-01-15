import { useEffect, useState } from "react";
import { getAllQuizAdmin } from "../../../../services/apiServices";
import ModalDeleteQuiz from "./ModalDeleteQuiz";
import ModalUpdateQuiz from "./ModalUpdateQuiz";
import { useTranslation } from 'react-i18next';

function TableQuiz(props) {

    const { t } = useTranslation();
    const [listQuiz, setListQuiz] = useState([]);
    const [showModalUpdate, setShowModalUpdate] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [dataQuiz, setDataQuiz] = useState({});

    useEffect(() => {
        getAllQuiz();
    }, []);

    const getAllQuiz = async () => {
        let res = await getAllQuizAdmin();
        if (res && res.EC === 0) {
            setListQuiz(res.DT);
        }
    };

    const handleClickBtnUpdate = (item) => {
        setShowModalUpdate(true);
        setDataQuiz(item);
    };

    const handleClickBtnDelete = (item) => {
        setShowModalDelete(true);
        setDataQuiz(item);
    };

    return (
        <>
            <div>
                {t('admin.feature.manage-quiz.manage.title-list')}
            </div>
            <table className="table table-striped table-hover table-bordered my-2">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">{t('admin.feature.manage-quiz.manage.name')}</th>
                        <th scope="col">{t('admin.feature.manage-quiz.manage.description')}</th>
                        <th scope="col">{t('admin.feature.manage-quiz.manage.difficulty')}</th>
                        <th scope="col">{t('admin.feature.manage-quiz.manage.actions')}</th>
                    </tr>
                </thead>
                <tbody>
                    {listQuiz && listQuiz.length === 0 &&
                        <tr>
                            <td colSpan={5}>{t('admin.feature.manage-quiz.manage.message')}</td>
                        </tr>
                    }
                    {listQuiz && listQuiz.length > 0 &&
                        listQuiz.map((item, index) => {
                            return (
                                <tr key={`table-quiz-${index}`}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.description}</td>
                                    <td>{item.difficulty}</td>
                                    <td>
                                        <button className="btn btn-warning mx-3" onClick={() => handleClickBtnUpdate(item)}>{t('admin.feature.manage-quiz.manage.btn-update')}</button>
                                        <button className="btn btn-danger" onClick={() => handleClickBtnDelete(item)}>{t('admin.feature.manage-quiz.manage.btn-delete')}</button>
                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
            <ModalUpdateQuiz show={showModalUpdate} setShow={setShowModalUpdate} dataQuiz={dataQuiz} setDataQuiz={setDataQuiz} getAllQuiz={getAllQuiz} />
            <ModalDeleteQuiz show={showModalDelete} setShow={setShowModalDelete} dataQuiz={dataQuiz} getAllQuiz={getAllQuiz} />
        </>
    );
}

export default TableQuiz;
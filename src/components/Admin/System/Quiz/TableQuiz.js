import { useEffect, useState } from "react";
import { getAllQuizAdmin } from "../../../../services/apiServices";
import ModalDeleteQuiz from "./ModalDeleteQuiz";
import ModalUpdateQuiz from "./ModalUpdateQuiz";

function TableQuiz(props) {

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
                List Quizzes
            </div>
            <table className="table table-striped table-hover table-bordered my-2">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Difficulty</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {listQuiz && listQuiz.length === 0 &&
                        <tr>
                            <td colSpan={5}>Not found data</td>
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
                                        <button className="btn btn-warning mx-3" onClick={() => handleClickBtnUpdate(item)}>Update</button>
                                        <button className="btn btn-danger" onClick={() => handleClickBtnDelete(item)}>Delete</button>
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
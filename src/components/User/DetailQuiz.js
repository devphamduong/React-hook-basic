import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDataQuiz } from '../../services/apiServices';

function DetailQuiz(props) {

    const params = useParams();
    const quizId = formatedId(params.id);
    const [listQuestion, setListQuestion] = useState([]);

    useEffect(() => {
        getQuestions();
    }, [quizId]);

    const getQuestions = async () => {
        let data = await getDataQuiz(quizId);
    };

    const formatedId = (id) => {
        return id.replace(/[^a-zA-Z0-9]/g, '');
    };

    return (
        <div>
            abc
        </div>
    );
}

export default DetailQuiz;
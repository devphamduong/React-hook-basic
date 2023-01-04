import _ from 'lodash';
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
        let res = await getDataQuiz(quizId);
        if (res && res.EC === 0) {
            let raw = res.DT;
            let data = _.chain(raw)
                // Group the elements of Array based on `id` property
                .groupBy("id")
                // `key` is group's name (id), `value` is the array of objects
                .map((value, key) => {
                    let answers = [];
                    let questionDescription, image = null;
                    value.forEach((item, index) => {
                        if (index === 0) {
                            questionDescription = item.description;
                            image = item.image;
                        }
                        answers.push(item.answers);
                    });
                    return { questionId: key, answers, questionDescription, image };
                })
                .value();
        }
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
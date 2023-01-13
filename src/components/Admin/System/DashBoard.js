import { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { getOverview } from '../../../services/apiServices';
import './DashBoard.scss';

function DashBoard(props) {

    const [dataOverview, setDataOverview] = useState([]);
    const [dataChart, setDataChart] = useState([]);

    useEffect(() => {
        getDataOverview();
    }, []);

    const getDataOverview = async () => {
        let res = await getOverview();
        if (res && res.EC === 0) {
            setDataOverview(res.DT);
            //process chart data
            let Qz = 0, Qs = 0, As = 0;
            Qz = res?.DT?.others?.countQuiz ?? 0;
            Qs = res?.DT?.others?.countQuestions ?? 0;
            As = res?.DT?.others?.countAnswers ?? 0;
            const data = [
                {
                    "name": "Quizzes",
                    "Qz": Qz,
                    "Qzs": ''
                },
                {
                    "name": "Questions",
                    "Qs": Qs,
                    "Qss": ''
                },
                {
                    "name": "Answers",
                    "As": As,
                    "Ass": ''
                }
            ];
            setDataChart(data);
        }
    };

    return (
        <div className="dashboard-container">
            <div className='title'>Analytics DashBoard</div>
            <div className='content'>
                <div className='left'>
                    <div className='child'>
                        <span className='text-1'>Total Users</span>
                        <span className='text-2'>
                            {dataOverview && dataOverview.users && dataOverview.users.total ?
                                <>{dataOverview.users.total}</> : <>0</>}
                        </span>
                    </div>
                    <div className='child'>
                        <span className='text-1'>Total Quizzes</span>
                        <span className='text-2'>
                            {dataOverview && dataOverview.others && dataOverview.others.countQuiz ?
                                <>{dataOverview.others.countQuiz}</> : <>0</>}
                        </span>
                    </div>
                    <div className='child'>
                        <span className='text-1'>Total Questions</span>
                        <span className='text-2'>
                            {dataOverview && dataOverview.others && dataOverview.others.countQuestions ?
                                <>{dataOverview.others.countQuestions}</> : <>0</>}
                        </span>
                    </div>
                    <div className='child'>
                        <span className='text-1'>Total Answers</span>
                        <span className='text-2'>
                            {dataOverview && dataOverview.others && dataOverview.others.countAnswers ?
                                <>{dataOverview.others.countAnswers}</> : <>0</>}
                        </span>
                    </div>
                </div>
                <div className='right'>
                    <ResponsiveContainer width="95%" height={"100%"}>
                        <BarChart width={400} height={300} data={dataChart}>
                            <CartesianGrid strokeDasharray={'3 3'} />
                            <XAxis dataKey={'name'} width={400} />
                            <YAxis />
                            <Tooltip />
                            {/* <Legend /> */}
                            <Bar dataKey={'Qz'} fill='#8884d8' />
                            <Bar dataKey={'Qs'} fill='#82ca9d' />
                            <Bar dataKey={'As'} fill='#fcb12a' />
                        </BarChart>
                    </ResponsiveContainer >
                </div>
            </div>
        </div>
    );
}

export default DashBoard;

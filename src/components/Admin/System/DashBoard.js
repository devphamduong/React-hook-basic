import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';
import './DashBoard.scss';

function DashBoard(props) {

    const data = [
        {
            "name": "A",
            "uv": 4000,
            "pv": 2400
        },
        {
            "name": "B",
            "uv": 4000,
            "pv": 2400
        }
    ];

    return (
        <div className="dashboard-container">
            <div className='title'>Analytics DashBoard</div>
            <div className='content'>
                <div className='left'>
                    <div className='child'>Total Users</div>
                    <div className='child'>Total Quizzes</div>
                    <div className='child'>Total Questions</div>
                    <div className='child'>Total Answers</div>
                </div>
                <div className='right'>
                    <BarChart width={400} height={300} data={data}>
                        <CartesianGrid strokeDasharray={'3 3'} />
                        <XAxis dataKey={'name'} />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey={'uv'} fill='#8884d8' />
                        <Bar dataKey={'pv'} fill='#82ca9d' />
                    </BarChart>
                </div>
            </div>
        </div>
    );
}

export default DashBoard;

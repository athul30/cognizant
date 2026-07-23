import React from 'react';
import '../Stylesheets/mystyle.css';

function CalculateScore(props) {
    const { name, school, total, goal } = props;
    const average = total / goal;

    return (
        <div className="score-card">
            <h2>Score Card</h2>
            <p>Name: {name}</p>
            <p>School: {school}</p>
            <p>Total: {total}</p>
            <p>Goal: {goal}</p>
            <p>Average Score: {average.toFixed(2)}</p>
        </div>
    );
}

export default CalculateScore;

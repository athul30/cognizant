import React from 'react';

const oddTeam = ['Rohit', 'Virat', 'Rahul', 'Bumrah'];
const evenTeam = ['Dhoni', 'Kohli', 'Shami', 'Jadeja'];

const [firstOdd, secondOdd, ...restOdd] = oddTeam;
const [firstEven, secondEven, ...restEven] = evenTeam;

const t20Players = ['Rohit', 'Virat', 'Suryakumar'];
const ranjiTrophyPlayers = ['Prithvi', 'Mayank', 'Cheteshwar'];

const allPlayers = [...t20Players, ...ranjiTrophyPlayers];

function IndianPlayers() {
    return (
        <div>
            <h2>Indian Players</h2>

            <h3>Odd Team Players</h3>
            <p>First: {firstOdd}, Second: {secondOdd}, Rest: {restOdd.join(', ')}</p>

            <h3>Even Team Players</h3>
            <p>First: {firstEven}, Second: {secondEven}, Rest: {restEven.join(', ')}</p>

            <h3>T20 + Ranji Trophy Players (Merged)</h3>
            <ul>
                {allPlayers.map((player, index) => (
                    <li key={index}>{player}</li>
                ))}
            </ul>
        </div>
    );
}

export default IndianPlayers;

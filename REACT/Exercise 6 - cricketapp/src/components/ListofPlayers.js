import React from 'react';

const players = [
    { name: 'Player 1', score: 45 },
    { name: 'Player 2', score: 78 },
    { name: 'Player 3', score: 32 },
    { name: 'Player 4', score: 91 },
    { name: 'Player 5', score: 60 },
    { name: 'Player 6', score: 25 },
    { name: 'Player 7', score: 88 },
    { name: 'Player 8', score: 55 },
    { name: 'Player 9', score: 69 },
    { name: 'Player 10', score: 40 },
    { name: 'Player 11', score: 75 }
];

function ListofPlayers() {
    const playerDetails = players.map((player) => `${player.name}: ${player.score}`);

    const lowScorers = players.filter((player) => player.score < 70);

    return (
        <div>
            <h2>List of Players</h2>
            <ul>
                {playerDetails.map((detail, index) => (
                    <li key={index}>{detail}</li>
                ))}
            </ul>

            <h3>Players with score below 70</h3>
            <ul>
                {lowScorers.map((player, index) => (
                    <li key={index}>{player.name}: {player.score}</li>
                ))}
            </ul>
        </div>
    );
}

export default ListofPlayers;

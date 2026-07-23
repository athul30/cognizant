import React from 'react';
import ListofPlayers from './components/ListofPlayers';
import IndianPlayers from './components/IndianPlayers';

const flag = true;

function App() {
    return (
        <div>
            {flag ? <ListofPlayers /> : <IndianPlayers />}
        </div>
    );
}

export default App;

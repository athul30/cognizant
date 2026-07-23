import React from 'react';
import CalculateScore from './Components/CalculateScore';

function App() {
    return (
        <div>
            <CalculateScore name="John Doe" school="Cognizant Academy" total={450} goal={5} />
        </div>
    );
}

export default App;

import React from 'react';
import CohortDetails from './CohortDetails';

function App() {
    return (
        <div>
            <CohortDetails name="React Batch 1" startDate="01-Jan-2024" status="ongoing" />
            <CohortDetails name="Spring Batch 2" startDate="01-Nov-2023" status="completed" />
        </div>
    );
}

export default App;

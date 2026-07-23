import React from 'react';

const officeSpaces = [
    { id: 1, name: 'Downtown Loft', rent: 45000, address: '12 Park Street' },
    { id: 2, name: 'Uptown Suite', rent: 72000, address: '88 MG Road' },
    { id: 3, name: 'Riverside Studio', rent: 58000, address: '5 River Lane' }
];

const office = { name: 'Downtown Loft', rent: 45000, address: '12 Park Street' };

function App() {
    const heading = React.createElement('h1', null, 'Office Space Rental');
    const image = React.createElement('img', {
        src: 'https://via.placeholder.com/300x150',
        alt: 'office space'
    });

    return (
        <div>
            {heading}
            {image}

            <h2>Featured Office</h2>
            <p>Name: {office.name}</p>
            <p>Address: {office.address}</p>
            <p style={{ color: office.rent < 60000 ? 'red' : 'green' }}>
                Rent: {office.rent}
            </p>

            <h2>All Office Spaces</h2>
            <ul>
                {officeSpaces.map((item) => (
                    <li key={item.id}>
                        {item.name} - {item.address} -{' '}
                        <span style={{ color: item.rent < 60000 ? 'red' : 'green' }}>
                            {item.rent}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;

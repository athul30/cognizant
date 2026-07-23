import React from 'react';

function User() {
    return (
        <div>
            <h2>Welcome back!</h2>
            <p>You can now book tickets for the following flights:</p>
            <ul>
                <li>Flight AI101 - Delhi to Mumbai - 09:00 AM <button>Book</button></li>
                <li>Flight AI202 - Mumbai to Bengaluru - 01:30 PM <button>Book</button></li>
            </ul>
        </div>
    );
}

export default User;

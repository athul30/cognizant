import React from 'react';

function BookDetails(props) {
    // Conditional rendering using if/else inside the function body
    if (!props.show) {
        return null;
    }

    return (
        <div>
            <h3>Book Details</h3>
            <p>Explore our collection of books.</p>
        </div>
    );
}

export default BookDetails;

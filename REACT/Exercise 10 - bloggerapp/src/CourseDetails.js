import React from 'react';

function CourseDetails(props) {
    // Conditional rendering using the ternary operator
    return (
        <div>
            {props.show ? (
                <div>
                    <h3>Course Details</h3>
                    <p>Browse our available courses.</p>
                </div>
            ) : null}
        </div>
    );
}

export default CourseDetails;

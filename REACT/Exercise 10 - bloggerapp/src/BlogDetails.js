import React from 'react';

function BlogDetails(props) {
    // Conditional rendering using the && operator
    return (
        <div>
            {props.show && (
                <div>
                    <h3>Blog Details</h3>
                    <p>Read our latest blog posts.</p>
                </div>
            )}
        </div>
    );
}

export default BlogDetails;

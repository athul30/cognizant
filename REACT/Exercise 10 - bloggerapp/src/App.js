import React from 'react';
import BookDetails from './BookDetails';
import BlogDetails from './BlogDetails';
import CourseDetails from './CourseDetails';

function App() {
    return (
        <div>
            <BookDetails show={true} />
            <BlogDetails show={true} />
            <CourseDetails show={true} />
        </div>
    );
}

export default App;

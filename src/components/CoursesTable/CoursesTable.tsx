import React, { Fragment } from 'react';
import { TutorialModel } from '@/api';

interface CoursesTableProps {
    courses: Array<TutorialModel>
}

const CoursesTable = ({ courses }: CoursesTableProps) => {

    const displayCourses = () => {
        if (!courses.length) return;

        return courses.map(course => (
            <Fragment key={course._id}>
                <p>{course.title}</p>
            </Fragment>
        ))
    }

    return (
        <div className='courses-table'>
            {displayCourses()}
        </div>
    );
};

export default CoursesTable;
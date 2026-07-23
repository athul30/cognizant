import React from 'react';
import styles from './CohortDetails.module.css';

function CohortDetails(props) {
    const { name, startDate, status } = props;
    const statusClass = status === 'ongoing' ? styles.ongoing : styles.completed;

    return (
        <div className={styles.box}>
            <h3 className={statusClass}>{name}</h3>
            <dl>
                <dt>Start Date</dt>
                <dd>{startDate}</dd>
                <dt>Status</dt>
                <dd>{status}</dd>
            </dl>
        </div>
    );
}

export default CohortDetails;

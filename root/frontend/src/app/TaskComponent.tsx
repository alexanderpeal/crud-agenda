interface TaskProps {
    itemName: string;
    description: string;
    deadline:Date;
    complete:boolean;
}

import React from 'react';

const TaskComponent: React.FC<TaskProps> = ({
    itemName, description, deadline, complete}) => {

    return (
        <div>
            <ul>
                <li>Task Name - {itemName}</li>
                <li>Description - {description}</li>
                <li>Deadline - {deadline.toString()}</li>
                <li>Status - {complete ? "Complete" : "Incomplete"}</li>
            </ul>
        </div>
    );
}

export default TaskComponent;
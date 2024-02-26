interface TaskProps {
    itemName: string;
    description: string;
    deadline:Date;
    complete:boolean;
}

import axios from 'axios';
import React, { useState } from 'react';

const TaskComponent: React.FC<TaskProps> = ({
    itemName, description, deadline, complete}) => {

    const [menuVisible, setMenuVisible] = useState<boolean>(false);

    const handleDelete = async () => {
        try {
          // Use the `axios.delete` method to send a DELETE request
          const response = await axios.delete(`http://localhost:3001/api/v1/tasks/${itemName}`);
          console.log('Task deleted successfully:', response.data);
          
          // Optionally, trigger re-fetching or updating of the task list in the parent component
          // onDeletion();
        } catch (error) {
          console.error('Error deleting task:', error);
        }
      };

    return (
        <div className="hover:bg-sky-700 relative flex items-start justify-between p-4">
            <div>
                <ul>
                    <li>Task Name - {itemName}</li>
                    <li>Description - {description}</li>
                    <li>Deadline - {deadline.toString()}</li>
                    <li>Status - {complete ? "Complete" : "Incomplete"}</li>
                </ul>
            </div>

            <button onClick={() => setMenuVisible(!menuVisible)} className="ml-4">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6h.01M12 12h.01M12 18h.01"></path></svg>
            </button>
            {menuVisible && (
                <div className="origin-top-right absolute right-0 mt-10 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        <button onClick={handleDelete} className="text-gray-700 block w-full text-left px-4 py-2 text-sm">
                            Delete
                        </button>
                        {/* Add more actions here */}
                    </div>
                </div>
            )}
        </div>
    );
}

export default TaskComponent;
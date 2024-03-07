/**
 * TaskComponent.tsx
 */

import React, { useState } from 'react';
import axios from 'axios';
import { Task } from './models';


interface TaskComponentProps {
    task: Task;
    onTaskDeleted: () => void;
}

const TaskComponent: React.FC<TaskComponentProps> = ({ task, onTaskDeleted }) => {
    const [menuVisible, setMenuVisible] = useState<boolean>(false);

    const handleDelete = async () => {
        try {
          const response = await axios.delete(`http://localhost:3001/api/v1/tasks/${task.name}`);
          console.log('Task deleted successfully:', response.data);
          
          onTaskDeleted();
        } catch (error) {
          console.error('Error deleting task:', error);
        }
      };

    return (
        <div className="hover:bg-sky-700 relative flex items-start justify-between p-4">
            <div>
                <ul>
                    <li>Task Name - {task.name}</li>
                    <li>Description - {task.description}</li>
                    <li>Deadline - {task.deadline ? task.deadline.toString() : "no deadline"}</li>
                    <li>Status - {task.status ? "Complete" : "Incomplete"}</li>
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
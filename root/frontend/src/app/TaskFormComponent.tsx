/**
 * TaskFormComponent.tsx
 */
import React, { useState } from 'react';
import axios from 'axios';

interface TaskFormProps {
  // Callback to refresh the task list in the parent component
  onTaskAdded: () => void
}

const TaskFormComponent: React.FC<TaskFormProps> = ({ onTaskAdded }) => {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:3001/api/v1/tasks/add',
        {name: name, description: description}
      );
      onTaskAdded();
      console.log(response.data);

      setName('');
      setDescription('');
    } catch (error) {
      console.error('There was an error submitting the form:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Item Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          rows={3}
        ></textarea>
      </div>

      {/* Include other form fields here */}

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default TaskFormComponent;

import React, { useState } from 'react';
import axios from 'axios';

// No props in this example, but you could define an interface for them if needed

function TaskForm() {
  const [itemName, setItemName] = useState<string>(''); // Specify the state variable type
  const [description, setDescription] = useState<string>(''); // Specify the state variable type
  // Add types for other state variables as needed

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => { // Type the event and return value
    e.preventDefault(); // Prevent the default form submit action

    try {
      const response = await axios.post('http://localhost:3001/api/v1/tasks/add', {
        itemName,
        description,
        // Include other fields as necessary
      });
      console.log(response.data);
      // Handle success (e.g., showing a success message, clearing the form)
    } catch (error) {
      console.error('There was an error submitting the form:', error);
      // Handle error (e.g., showing an error message)
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="mb-4">
        <label htmlFor="itemName" className="block text-sm font-medium text-gray-700">
          Item Name
        </label>
        <input
          type="text"
          id="itemName"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
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

export default TaskForm;

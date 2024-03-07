'use client'

import Image from "next/image";
import TaskComponent from "./TaskComponent";
import TaskFormComponent from "./TaskFormComponent";
import axios from 'axios';
import React, { useState, useEffect } from "react";

interface Task {
  name: string;
  description: string;
  deadline:Date;
  status:boolean;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = async () => {
    const response = await axios.get<Task[]>('http://localhost:3001/api/v1/tasks');
    setTasks(response.data);
  };

  useEffect(() => {
    axios.get('http://localhost:3001/api/v1/tasks')
      .then(response => {
        setTasks(response.data); // Axios automatically converts JSON data
      })
      .catch(error => console.error("Failed to fetch data:", error));
  }, []);

  console.log(tasks);

  return (
    <main className="">
      {/* Title */}
      <div className="w-full p-8 bg-red-200">
        <h1 className="text-center text-3xl ">To-Do List</h1>
      </div>

      {/* Container 1 */}
      <div className="flex flex-wrap">
        {/* View of tasks (use media queries) */}
        <div className="flex-1 p-4 bg-yellow-200">
          {tasks.map(task => (
            <TaskComponent
            // itemName={task.itemName}
            // description="test description"
            // deadline={task.deadline ? task.deadline : new Date()}
            // complete={false}
            task={task}
            onTaskDeleted={fetchTasks}
          />
          ))}
        </div>

        {/* Add a new task view */}
        <div className="flex-1 bg-green-200">
          <TaskFormComponent onTaskAdded={fetchTasks}/>
        </div>

      </div>



    </main>
  );
}
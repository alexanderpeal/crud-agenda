'use client'

import Image from "next/image";
import TaskComponent from "./TaskComponent";
import FormComponent from "./FormComponent";
import axios from 'axios';
import React, { useState, useEffect } from "react";

interface Task {
  itemName: string;
  description: string;
  deadline:Date;
  complete:boolean;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

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
            itemName={task.itemName}
            description="test description"
            deadline={new Date()}
            complete={false}
          />
          ))}
        </div>

        {/* Add a new task view */}
        <div className="flex-1 bg-green-200">
          <FormComponent />
        </div>

      </div>

      

    </main>
  );
}
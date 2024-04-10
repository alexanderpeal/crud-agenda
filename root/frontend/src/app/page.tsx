'use client'

import axios from 'axios';
import React, { useState, useEffect } from "react";
import TaskComponent from "./TaskComponent";
import TaskFormComponent from "./TaskFormComponent";
import Sidebar from './Sidebar';
import Header from './Header';


interface Task {
  name: string;
  description: string;
  deadline: Date;
  status: boolean;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = async () => {
    const response = await axios.get<Task[]>(process.env.NEXT_PUBLIC_API_KEY ?? "");
    setTasks(response.data);
  };

  useEffect(() => {
    axios.get(process.env.NEXT_PUBLIC_API_KEY ?? "")
      .then(response => {
        setTasks(response.data); // Axios automatically converts JSON data
      })
      .catch(error => console.error("Failed to fetch data:", error));
  }, []);

  console.log(tasks);

  return (
    <main className="">
      <Header />
      

      {/* <Sidebar />

      <div className="w-full p-8 bg-red-200">
        <h1 className="text-center text-3xl ">To-Do List</h1>
      </div> */}

      {/* <div className="flex flex-wrap">
        <div className="flex-1 p-4 bg-yellow-200">
          {tasks.map(task => (
            <TaskComponent task={task} onTaskDeleted={fetchTasks}/>
          ))}
        </div>

        <div className="flex-1 bg-green-200">
          <TaskFormComponent onTaskAdded={fetchTasks}/>
        </div>

      </div> */}

    </main>
  );
}
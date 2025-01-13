import { createContext, ReactNode, useEffect, useState } from "react";
import {Task} from "../entities/Task"
import { tasksService } from "../services/api";

export interface TasksContextData {
    tasks: Task[],
    createTask: (attributes: Omit<Task, "id">) => Promise<Task>
    updateTask: (id: number, attributes: Partial<Omit<Task, "id">>) => Promise<void>
    deleteTask: (id: number) => Promise<void>
}

export const TasksContext = createContext({} as TasksContextData)

interface TasksContextProviderProps {
    children: ReactNode
}

export const TasksContextProvider: React.FC<TasksContextProviderProps> = ({children}) => {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        tasksService.fetchTasks().then((storedTasks) => {
          setTasks(storedTasks);
        });
      });

    const createTask = async() => {
        const newTask: Task = {id: 100, title: "Teste", description: "Teste", status: "todo", priority: "low"}

        return newTask
    }

    const updateTask = async(id: number, attributes: Partial<Omit<Task, "id">>) => {

    }

    const deleteTask = async(id: number) => {

    }
    
    return(
        <TasksContext.Provider value={{tasks, createTask, updateTask, deleteTask}}>
            {children}
        </TasksContext.Provider>
    )
}
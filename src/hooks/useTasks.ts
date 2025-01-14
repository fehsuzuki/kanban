//Simplificar o uso do useContext(TasksContext) em outros componentes

import { useContext } from "react"
import { TasksContext } from "../contexts/TasksContext"

export const useTasks = () => {
    return useContext(TasksContext)
}
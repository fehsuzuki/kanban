//Simplificar o uso do useContext(TasksContext) em outros componentes
//Não muda em nada no funcionamento do programa

import { useContext } from "react"
import { TasksContext } from "../contexts/TasksContext"

export const useTasks = () => {
    return useContext(TasksContext)
}
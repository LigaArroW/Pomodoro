import { create } from "zustand"
import { devtools } from "zustand/middleware"
import { immer } from "zustand/middleware/immer"

interface ITasks {
    tasks: task[]
    addTask: (value: task) => void,
    removeTask: (id: number) => void
}

export interface task {
    id: number,
    task: string,
    timer: number | null
}

export const useTask = create<ITasks>()(immer(devtools((set) => ({
    tasks: [],
    addTask: (value: task) => set(state => {
        const findValue = state.tasks.find(val => val.task === value.task)
        findValue ? findValue.task : state.tasks.push({ id: value.id, task: value.task, timer: value.timer })
    }),
    removeTask: (id: number) => set(state => {
        state.tasks = state.tasks.filter(task => id !== task.id)
    }),
}))))
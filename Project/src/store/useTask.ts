import { create } from "zustand"
import { devtools } from "zustand/middleware"
import { immer } from "zustand/middleware/immer"

 interface ITasks {
    tasks: task[]
    addTask: (value: task) => void
}

export interface task {
    id: number,
    task: string,
}

export const useTask = create<ITasks>()(immer(devtools((set) => ({
    tasks: [],
    addTask: (value: task) => set(state => {
        const findValue = state.tasks.find(val => val.task === value.task)
        findValue ? findValue.task : state.tasks.push({ id: value.id, task: value.task })
    })
}))))
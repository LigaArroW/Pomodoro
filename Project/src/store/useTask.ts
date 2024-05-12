import { create } from "zustand"
import { devtools } from "zustand/middleware"
import { immer } from "zustand/middleware/immer"
import { DEFAULT_TIME, MINUTE } from "../constants/DEFAULT_TIME"

export enum resizePomidor {
    inc = 1,
    dec = -1
}

interface ITasks {
    tasks: task[]
    editTasksArr: task[],
    dropdowns: { [key: string]: boolean },
    addTask: (value: string) => void,
    removeTask: (text: string) => void
    editTask: (task: task) => void
    activeTask: (task: task) => void
    inrementTime: (task: task) => void
    resizePomidor: (task: task, value: resizePomidor) => void
    // decrement: (task: task) => void
    editTime: (timer: number, value: string) => void
    openDropdown: (taskTitle: string) => void;
    closeDropdown: (taskTitle: string) => void;
}


export interface task {
    pomidor: number,
    task: string,
    timer: number
    active: boolean
}

export const useTask = create<ITasks>()(immer(devtools((set) => ({
    tasks: [],
    editTasksArr: [],
    dropdowns: {},
    addTask: (value: string) => set(state => {
        if (state.editTasksArr.length > 0) {
            const editValue = state.tasks.find(task => task.task === (state.editTasksArr[0]).task)
            if (editValue) {
                editValue.task = value
            }
            state.editTasksArr.splice(0, state.editTasksArr.length)
        } else {
            const findTask = state.tasks.find(task => task.task === value)
            findTask ?? state.tasks.push({ pomidor: 1, task: value, timer: DEFAULT_TIME, active: state.tasks.length === 0 ? true : false })
        }

    }),
    removeTask: (text: string) => set(state => {
        state.tasks = state.tasks.filter(task => text !== task.task)
    }),
    editTask: (task: task) => set(state => {
        state.editTasksArr.push(task)
    }),
    activeTask: (task: task) => set(state => {
        const findValue = state.tasks.find(val => val.task === task.task)
        if (findValue?.active === false) {
            state.tasks.map(task => task.active = false)
            if (findValue) {
                findValue.active = true
            }
        }
        // state.tasks.sort((a, b) => {
        //     if (a.active) return -1
        //     return a.id - b.id
        // })
    }),
    inrementTime: (task: task) => set(state => {
        const findValue = state.tasks.find(val => val.task === task.task)
        // findValue && findValue.timer && findValue.timer + MINUTE
        if (findValue && findValue.timer) {
            findValue.timer += MINUTE
        }
    }),
    resizePomidor: (task: task, value: resizePomidor) => set(state => {
        const findValue = state.tasks.find(val => val.task === task.task)
        if (findValue) {
            if (task.pomidor === 1 && value === resizePomidor.dec) return
            findValue.pomidor = findValue.pomidor + value
        }

    }),
    editTime: (timer: number, value: string) => set(state => {
        const findValue = state.tasks.find(val => val.task === value)
        if (findValue) {
            findValue.timer = timer
        }
    }),
    openDropdown: (taskTitle: string) => set(state => {

        // state.dropdowns = { ...state.dropdowns, [taskTitle]: true };
        state.dropdowns = Object.keys(state.dropdowns).reduce((acc: { [key: string]: boolean }, key) => {
            acc[key] = false;
            return acc;
        }, {});
        state.dropdowns[taskTitle] = true;
    }),
    closeDropdown: (taskTitle: string) => set(state => {
        state.dropdowns = { ...state.dropdowns, [taskTitle]: false };
    })

}))))
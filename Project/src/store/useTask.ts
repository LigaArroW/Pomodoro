import { create } from "zustand"
import { devtools } from "zustand/middleware"
import { immer } from "zustand/middleware/immer"
import { DEFAULT_TIME, MINUTE } from "../constants/DEFAULT_TIME"

interface ITasks {
    tasks: task[]
    editTasksArr: task[],
    dropdowns: { [key: string]: boolean },
    addTask: (value: task) => void,
    removeTask: (id: number) => void
    editTask: (task: task) => void
    activeTask: (task: task) => void
    inrement: (task: task) => void
    decrement: (task: task) => void
    editTime: (timer: number, value: string) => void
    openDropdown: (taskTitle: string) => void;
    closeDropdown: (taskTitle: string) => void;
}


export interface task {
    id: number,
    task: string,
    timer: number
    active: boolean
}

export const useTask = create<ITasks>()(immer(devtools((set) => ({
    tasks: [],
    editTasksArr: [],
    dropdowns: {},
    addTask: (value: task) => set(state => {
        if (state.editTasksArr.length > 0) {
            const editValue = state.tasks.find(task => task.task === (state.editTasksArr[0]).task)
            if (editValue) {
                editValue.task = value.task
            }
            state.editTasksArr.splice(0, state.editTasksArr.length)
        } else {
            const findValue = state.tasks.find(val => val.task === value.task)
            findValue ? findValue.task : state.tasks.push({ id: value.id, task: value.task, timer: value.timer, active: value.active })
        }
        state.tasks.sort((a, b) => {
            if (a.active) return -1
            return a.id - b.id
        })
    }),
    removeTask: (id: number) => set(state => {
        state.tasks = state.tasks.filter(task => id !== task.id)
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
        state.tasks.sort((a, b) => {
            if (a.active) return -1
            return a.id - b.id
        })
    }),
    inrement: (task: task) => set(state => {
        const findValue = state.tasks.find(val => val.task === task.task)
        // findValue && findValue.timer && findValue.timer + MINUTE
        if (findValue && findValue.timer) {
            findValue.timer += MINUTE
        }
    }),
    decrement: (task: task) => set(state => {
        const findValue = state.tasks.find(val => val.task === task.task)
        if (findValue && findValue.timer && findValue.timer > DEFAULT_TIME) {
            const result = findValue.timer - MINUTE
            // findValue.timer = result < DEFAULT_TIME ? findValue.timer : result
            findValue.timer = result > DEFAULT_TIME ? result : findValue.timer > DEFAULT_TIME ? DEFAULT_TIME : findValue.timer
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
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";
import { compareTwoDate } from "../utils/compareTwoDate";

export interface IStat {
    timeToJob: number
    pomidors: number
    timeToPause: number
    stops: number
    date: string
}


interface IStatistic {
    statiscic: IStat[]
    curentDay: IStat[]
    addStatistic: () => void
    editStatistic: (key: keyof Omit<IStat, 'date'>, value: number) => void,
    addCurentDay: (date: string) => void
}

export const useStatistic = create<IStatistic>()(immer((devtools(persist((set) => ({
    statiscic: [],
    curentDay: [],
    addStatistic: () => set(state => {
        const findStat = state.statiscic.find(stat => compareTwoDate(stat.date, new Date()))
        if (findStat) return
        state.statiscic.push({
            pomidors: 0,
            stops: 0,
            timeToJob: 0,
            timeToPause: 0,
            date: new Date().toLocaleDateString()
        })
    }),
    editStatistic: (key: keyof Omit<IStat, 'date'>, value: number) => set(state => {
        const today = new Date()

        const findStat = state.statiscic.find(stat => compareTwoDate(stat.date, today))
        if (findStat) {
            findStat[key] += value
        }
    }),
    addCurentDay: (date: string) => set(state => {
        const stat = state.statiscic.find(stat => stat.date === date)

        if (stat) {
            if (state.curentDay.length > 0) state.curentDay.pop()
            state.curentDay.push(stat)
        }
    })
}), { name: 'statistic', version: 1, getStorage: () => localStorage })))))
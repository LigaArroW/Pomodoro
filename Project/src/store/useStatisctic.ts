import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";
import { compareTwoDate } from "../utils/compareTwoDate";
import { MINUTE } from "../constants/DEFAULT_TIME";

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
    // addStatistic: (value: { [key in keyof Partial<Omit<IStat, 'date'>>]: number }, date: Date) => void
    editStatistic: (key: keyof Omit<IStat, 'date'>, value: number) => void,
    addCurentDay: (date: string) => void
}

export const useStatistic = create<IStatistic>()(immer((devtools(persist((set) => ({
    statiscic: [
        { date: "20.05.2024", pomidors: 10, stops: 3, timeToJob: MINUTE * 60 * 5, timeToPause: 20000 },
        { date: "21.05.2024", pomidors: 5, stops: 0, timeToJob: MINUTE * 60, timeToPause: 0 },
        { date: "22.05.2024", pomidors: 7, stops: 2, timeToJob: MINUTE * 20 * 5, timeToPause: 20560 },
        { date: "23.05.2024", pomidors: 4, stops: 1, timeToJob: MINUTE * 2, timeToPause: 54232 },
        { date: "24.05.2024", pomidors: 4, stops: 10, timeToJob: MINUTE * 10, timeToPause: 489125 },
        { date: "25.05.2024", pomidors: 2, stops: 0, timeToJob: MINUTE * 15, timeToPause: 0 },
        { date: "26.05.2024", pomidors: 2, stops: 0, timeToJob: MINUTE * 65, timeToPause: 0 },
        { date: "18.05.2024", pomidors: 2, stops: 0, timeToJob: MINUTE * 65, timeToPause: 0 },
    ],
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
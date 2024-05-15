import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { compareTwoDate } from "../utils/compareTwoDate";

interface IStat {
    timeToJob: number
    pomidors: number
    timeToPause: number
    stops: number
    date: string
}

interface IStatistic {
    statiscic: IStat[]
    addStatistic: () => void
    // addStatistic: (value: { [key in keyof Partial<Omit<IStat, 'date'>>]: number }, date: Date) => void
    editStatistic: (key: keyof Omit<IStat, 'date'>, value: number) => void
}

export const useStatistic = create<IStatistic>()(immer((devtools((set) => ({
    statiscic: [],
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
    })
})))))
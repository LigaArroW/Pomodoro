import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface IStat {
    timeToJob: number
    pomidors: number
    timeToPause: number
    stops: number
    date: string
}

interface IStatistic {
    statiscic: IStat[]
    addStatistic: (value: IStat) => void

}

export const useStatistic = () => create<IStatistic>()(immer((devtools((set) => ({
    statiscic: [],
    addStatistic: (value: Omit<IStat, 'date'>) => set(state => {
        state.statiscic.push({ ...value, date: new Date().toLocaleDateString() })
    })
})))))
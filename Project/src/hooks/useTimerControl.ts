import { useState } from "react"

interface ITimerControl {
    time: number | null
}

export const useTimerControl = ({ time }: ITimerControl) => {
    const [isPaused, setIsPaused] = useState<boolean>(false)
    const [timer, setTimer] = useState(time)
}
import { useEffect, useRef, useState } from "react"
import { DEFAULT_TIME, MINUTE } from "../constants/DEFAULT_TIME"


export const useTimerControl = () => {
    const [isRunning, setisRunning] = useState<boolean>(false)
    const [timer, setTimer] = useState<number>(DEFAULT_TIME)
    const intervalRef = useRef(0)

    useEffect(() => {
        if (isRunning) {
            intervalRef.current = setInterval(() => {
                setTimer(prev => prev - 1000)
            }, 1000)
        }
        return () => {
            clearInterval(intervalRef.current)
        }
    }, [isRunning])

    const paused = () => {
        setisRunning(!isRunning)
    }

    const increment = () => {
        setTimer(prev => prev + MINUTE)
    }

    const stop = () => {
        setisRunning(false)
        setTimer(DEFAULT_TIME)
    }

    return { timer, paused, isRunning, stop, increment }
}

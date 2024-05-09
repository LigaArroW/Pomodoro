import { useEffect, useRef, useState } from "react"
import { DEFAULT_TIME } from "../constants/DEFAULT_TIME"
import { task, useTask } from "../store/useTask"




export const useTimerControl = (task: task) => {
    const [isRunning, setisRunning] = useState<boolean>(false)
    const [timer, setTimer] = useState(0)
    const editTimer = useTask(state => state.editTime)
    const timeRefSeconds = useRef(timer)
    const intervalRef = useRef(0)

    useEffect(() => {
        setTimer(task.timer)
    }, [task.timer])

    useEffect(() => {
        if (isRunning) {
            intervalRef.current = setInterval(() => {
                timeRefSeconds.current -= 1
                // console.log(timeRefSeconds.current);
                setTimer(timeRefSeconds.current * 1000)
            }, 1000)
        }

        return () => {
            clearInterval(intervalRef.current)

        }
    }, [isRunning])

    const paused = () => {
        setisRunning(!isRunning)
        timeRefSeconds.current = timer / 1000
        editTimer(timer, task.task)
    }

    const stop = () => {
        setisRunning(false)
        setTimer(DEFAULT_TIME)
        timeRefSeconds.current = timer / 1000
    }

    return { timer, paused, stop }
}
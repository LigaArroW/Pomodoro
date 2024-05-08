import { useEffect, useRef, useState } from "react"



const DEFAULT_TIME = 1000 * 60 * 25

export const useTimerControl = (time: number | undefined = undefined) => {
    const [isRunning, setisRunning] = useState<boolean>(false)
    const [timer, setTimer] = useState(time ? time : DEFAULT_TIME)
    const timeRefSeconds = useRef(timer / 1000)
    const intervalRef = useRef(0)
    // console.log(timer / 60);

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
    }

    const stop = () => {

    }

    return { timer, paused }
}
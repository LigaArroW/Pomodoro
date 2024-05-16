import { useCallback, useEffect, useRef, useState } from "react"
import {  MINUTE } from "../constants/DEFAULT_TIME"
import { useStatistic } from "../store/useStatisctic"


export const useTimerControl = (time: number[],relax:boolean ) => {
    const [timetoJob,timeToRelax] = time
    const [timer, setTimer] = useState<number>(timetoJob)
    const [isRunning, setIsRunning] = useState<boolean>(false)
    const [pausedTime, setPausedTime] = useState<number>(0)
    const intervalRef = useRef<number | null>(null)
    const stat = useStatistic(state=>state.editStatistic)
    
    
    const control = useCallback((type: 'start'| 'pause' | 'increment' | 'stop' | 'done',pomidors?:number) => {
        switch (type) {
            case 'start':
                setIsRunning(true)
                break
            case 'pause':
                setIsRunning(false);
                setPausedTime(Date.now())
                break;
            case 'increment':
                setTimer(prev => prev + MINUTE);
                break;
            case 'stop':
                setIsRunning(false);
                setTimer(relax ? timeToRelax : timetoJob);
                !relax && stat('stops',1)
                break;
            case 'done':
                console.log(pomidors);
                
                setIsRunning(false);
                setTimer(relax ? timetoJob : pomidors && pomidors === 1 ? timetoJob : timeToRelax);
                setPausedTime(0)
                !relax && stat('pomidors',1)
        }
    }, [relax, stat, timeToRelax, timetoJob])


    useEffect(() => {
        if (isRunning) {
            
            if(pausedTime>0 && !relax){
                stat('timeToPause', Date.now() - pausedTime)
                setPausedTime(0)
            }
            intervalRef.current = setInterval(() => {
                setTimer(prev => prev - 1000)
            }, 1000)
        } else if (intervalRef.current) {
            clearInterval(intervalRef.current)
            intervalRef.current = null
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
            }
        }
    }, [isRunning, pausedTime, relax, stat])


    return { timer, isRunning, control };
}

// export const useTimerControl = (time: number = DEFAULT_TIME) => {
//     const [isRunning, setisRunning] = useState<boolean>(false)
//     const [timer, setTimer] = useState<number>(time)
//     const intervalRef = useRef(0)



//     useEffect(() => {
//         setTimer(time)
//         if (isRunning) {
//             intervalRef.current = setInterval(() => {
//                 setTimer(prev => prev - 1000)
//             }, 1000)
//         }
//         return () => {
//             clearInterval(intervalRef.current)
//         }
//     }, [isRunning, time])

//     const paused = () => {
//         setisRunning(!isRunning)
//     }

//     const increment = () => {
//         setTimer(prev => prev + MINUTE)
//     }

//     const stop = () => {
//         setisRunning(false)
//         setTimer(DEFAULT_TIME)
//     }
    
   

//     return { timer, paused, isRunning, stop, increment }
// }

import { useEffect } from "react"
import { useState } from "react"
import { useRef } from "react"

export default function Promodoro() {

    const [isRunning, setIsRunning] = useState(false)
    const [remainingTime, setRemainingTime] = useState(25 * 60 * 1000) 
    const intervalIdRef = useRef(null)
    // const startTimeRef = useRef(0)
    const endTimeRef = useRef(0)
    const [isActive, setIsActive] = useState("focus")

    useEffect(() => {
        if (isRunning) {
            endTimeRef.current = Date.now() + remainingTime
            intervalIdRef.current = setInterval(() => {
                const newRemainingTime = endTimeRef.current - Date.now()
                if (newRemainingTime <= 0) {
                    setRemainingTime(0)
                    clearInterval(intervalIdRef.current)
                    setIsRunning(false)
                    alert(`time's over`)
                } else {
                    setRemainingTime(newRemainingTime)
                }
            }, 10)
        }

        return () => {
            clearInterval(intervalIdRef.current);
        }
    }, [isRunning])

    function toggleTimer() {
        if (remainingTime > 0) setIsRunning(!isRunning)
    }

    function reset() {
        setRemainingTime(25 * 60 * 1000)
        setIsRunning(false)
    }
    function shortBreak() {
        setRemainingTime(5 * 60 * 1000)
        setIsRunning(false)
    }
    function longBreak() {
        setRemainingTime(15 * 60 * 1000)
        setIsRunning(false)
    }
    function formatTime() {

        // let hours = Math.floor(elapsedTime / (1000 * 60 * 60))
        let minutes = Math.floor(remainingTime / (1000 * 60) % 60)
        let seconds = Math.floor(remainingTime / (1000) % 60)
        // let miliseconds = Math.floor((elapsedTime % 1000) / 10)

        // hours = String(hours).padStart(2, "0");
        minutes = String(minutes).padStart(2, "0");
        seconds = String(seconds).padStart(2, "0");
        // miliseconds = String(miliseconds).padStart(2, "0");

        return `${minutes}:${seconds}`
    }

    const getButtonStyle = (button) => ({
    backgroundColor: isActive === button ? '#3e3e3e' : 'transparent',
    transition: "0.3s ease",
  });

    return (<div className="promodoro">
                <div className="controls-one">
                <button onClick={() => {setIsActive("focus"), reset()}} style={getButtonStyle("focus")} disabled={isRunning && isActive === "focus"}>Focus</button>
                <button onClick={() => {setIsActive("short"), shortBreak()}} style={getButtonStyle("short")} disabled={isRunning && isActive === "short"}>Short Break</button>                       
                <button onClick={() => {setIsActive("long"), longBreak()}} style={getButtonStyle("long")} disabled={isRunning && isActive === "long"}>Long Break</button>
                </div>
                <div className="display">{formatTime()}</div>
                <div className="controls">
                    <button onClick={toggleTimer} className={isRunning ? "stop-btn" : "start-btn"} disabled={remainingTime <= 0}>{isRunning ? "Stop" : "Start"}</button>
                    <button onClick={reset} className="reset-btn">Reset</button>
                </div>
    </div>
    )
    
}
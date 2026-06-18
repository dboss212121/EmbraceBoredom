// Imports
import { useEffect, useRef, useState } from 'react'

export function useBoredomTimer() {
  // Timer state
  const [seconds, setSeconds] = useState(0)
  const intervalRef = useRef<NodeJS.Timer | null>(null)

  // Start timer
  const start = () => {
    if (intervalRef.current) return
    intervalRef.current = setInterval(() => {
      setSeconds(prev => prev + 1)
    }, 1000)
  }

  // Stop timer
  const stop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  // Reset timer
  const reset = () => {
    stop()
    setSeconds(0)
  }

  // Cleanup
  useEffect(() => {
    return () => stop()
  }, [])

  return { seconds, start, stop, reset }
}

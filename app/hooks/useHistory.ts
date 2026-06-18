// Imports
import { useState } from 'react'

export type SessionRecord = {
  duration: number
  timestamp: number
}

export function useSessionHistory() {
  // Session history state
  const [history, setHistory] = useState<SessionRecord[]>([])

  // Add session
  const addSession = (duration: number) => {
    setHistory(prev => [
      ...prev,
      { duration, timestamp: Date.now() }
    ])
  }

  return { history, addSession }
}

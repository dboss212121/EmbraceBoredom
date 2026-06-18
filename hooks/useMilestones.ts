// Imports
import { useState, useEffect } from 'react'

export function useMilestones(seconds: number) {
  // Milestone state
  const [milestones, setMilestones] = useState<number[]>([])

  // Track milestones
  useEffect(() => {
    const marks = [10, 30, 60, 120, 300]
    if (marks.includes(seconds)) {
      setMilestones(prev => [...prev, seconds])
    }
  }, [seconds])

  return milestones
}

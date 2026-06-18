// Defines milestone thresholds for boredom achievements
export const MILESTONES = [
  60,        // 1 minute
  300,       // 5 minutes
  900,       // 15 minutes
  3600,      // 1 hour
  86400,     // 1 day
  604800,    // 1 week
]

// Checks if a given time hits a milestone
export function checkMilestone(seconds: number) {
  return MILESTONES.includes(seconds)
}

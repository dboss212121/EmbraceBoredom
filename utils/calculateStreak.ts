// Calculates daily streak from session timestamps
export function calculateStreak(timestamps: number[]) {
  if (timestamps.length === 0) return 0

  const days = timestamps
    .map(ts => new Date(ts).toDateString())
    .filter((v, i, arr) => arr.indexOf(v) === i)

  let streak = 1

  for (let i = days.length - 1; i > 0; i--) {
    const prev = new Date(days[i - 1])
    const curr = new Date(days[i])

    const diff = (curr.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24)

    if (diff === 1) streak++
    else break
  }

  return streak
}

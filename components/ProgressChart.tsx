import { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { getDailyStats } from '../utils/storage'

const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export default function ProgressChart() {
  const [weeklyBest, setWeeklyBest] = useState<{ label: string; value: number }[]>([])

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    const dailyStats = await getDailyStats()

    // 1. Find the Sunday of the current week
    const currentDayOfWeek = new Date().getDay() // 0 (Sun) to 6 (Sat)

    const staticWeek = Array.from({ length: 7 }).map((_, i) => {
      const d = new Date()
      // Subtract days to get back to Sunday, then add 'i' to move forward day-by-day
      d.setDate(d.getDate() - currentDayOfWeek + i)

      // Convert to local YYYY-MM-DD format to match storage keys
      const tzOffset = d.getTimezoneOffset() * 60000
      const localISODate = new Date(d.getTime() - tzOffset).toISOString().split('T')[0]

      return {
        dateStr: localISODate,
        label: DAY_LABELS[d.getDay()]
      }
    })

    // 2. Map our chart bars to the matching dates in our storage stats
    const chartData = staticWeek.map(day => {
      const match = dailyStats.find(stat => stat.date === day.dateStr)
      return {
        label: day.label,
        value: match?.bestSession?.duration || 0
      }
    })

    setWeeklyBest(chartData)
  }

  const maxValue = Math.max(...weeklyBest.map(d => d.value), 1)

  return (
    <View style={styles.chartContainer}>
      {weeklyBest.map((day, index) => {
        // Enforce a maximum visual layout ceiling of 120px
        const calculatedHeight = (day.value / maxValue) * 120

        return (
          <View key={index} style={styles.barGroup}>
            {/* The Track Container wraps the bar to secure dedicated height space */}
            <View style={styles.track}>
              <View
                style={[
                  styles.bar,
                  {
                    // Ensure the bar is physically visible if value > 0
                    height: day.value > 0 ? Math.max(calculatedHeight, 8) : 0
                  }
                ]}
              />
            </View>
            <Text style={styles.label}>{day.label}</Text>
            <Text style={styles.value}>{day.value > 0 ? `${day.value}s` : '0s'}</Text>
          </View>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around', // Changed from space-between for better alignment distribution
    alignItems: 'flex-end',
    marginTop: 20,
    backgroundColor: '#111',
    paddingVertical: 16,
    borderRadius: 12,
    height: 190, // Explicit container height context
  },
  barGroup: {
    alignItems: 'center',
    flex: 1, // Let each day section fill equal space horizontally
  },
  track: {
    height: 120, // Lock the chart ceiling grid context
    justifyContent: 'flex-end', // Keeps the bars anchored to the floor baseline
    alignItems: 'center',
    width: '100%',
  },
  bar: {
    width: 14,
    backgroundColor: '#ffffff', // Solid bright white
    borderRadius: 4,
  },
  label: {
    color: '#666',
    marginTop: 8,
    fontSize: 12,
    fontWeight: '600',
  },
  value: {
    color: '#444',
    fontSize: 10,
    marginTop: 2,
  },
})
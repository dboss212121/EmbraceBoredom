import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { router } from 'expo-router'
import ProgressChart from '../components/ProgressChart'
import { getDailyStats, DailyStat } from '../utils/storage'

export default function ProgressScreen() {
  const [dailyHistory, setDailyHistory] = useState<DailyStat[]>([])

  // Load the calculated daily statistics when the screen mounts
  useEffect(() => {
    async function loadStats() {
      const stats = await getDailyStats()
      setDailyHistory(stats)
    }
    loadStats()
  }, [])

  // Helper to make date strings look a bit friendlier (e.g., "June 9")
  const formatDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split('-')
    const date = new Date(Number(year), Number(month) - 1, Number(day))
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>Your Progress</Text>
      
      <ProgressChart />

      <View style={styles.historyContainer}>
        <Text style={styles.sectionTitle}>Daily Records</Text>
        
        {dailyHistory.length === 0 ? (
          <Text style={styles.emptyText}>No sessions recorded yet.</Text>
        ) : (
          dailyHistory.map((item) => (
            <View key={item.date} style={styles.dayCard}>
              <Text style={styles.dateText}>{formatDate(item.date)}</Text>
              
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>Last Session</Text>
                <Text style={styles.statValue}>{item.lastSession?.duration}s</Text>
              </View>

              <View style={styles.statRow}>
                <Text style={styles.statLabel}>🥇 Best Session</Text>
                <Text style={[styles.statValue, styles.bestValue]}>
                  {item.bestSession?.duration}s
                </Text>
              </View>
            </View>
          ))
        )}
      </View>

      <TouchableOpacity style={styles.secondaryButton} onPress={() => router.push('/main-menu')}>
        <Text style={styles.secondaryText}>Back to Menu</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  contentContainer: {
    padding: 24,
    paddingBottom: 40,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  historyContainer: {
    marginTop: 32,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  emptyText: {
    color: '#444',
    fontSize: 14,
    fontStyle: 'italic',
  },
  dayCard: {
    backgroundColor: '#111',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#222',
  },
  dateText: {
    color: '#888',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
  },
  statLabel: {
    color: '#555',
    fontSize: 14,
  },
  statValue: {
    color: '#eee',
    fontSize: 14,
    fontWeight: '500',
  },
  bestValue: {
    color: '#fff',
    fontWeight: '700',
  },
  secondaryButton: {
    marginTop: 24,
    alignItems: 'center',
    paddingVertical: 12,
  },
  secondaryText: {
    color: '#666',
    fontSize: 16,
  },
})
import { View, StyleSheet } from 'react-native'
import { router } from 'expo-router'
import { useEffect } from 'react'
import TimerDisplay from '../../components/TimerDisplay'
import { useBoredomTimer } from '../../hooks/useBoredomTimer'

export default function BoredomModeScreen() {
  const { seconds, start, stop } = useBoredomTimer()

  useEffect(() => {
    start()
    return () => stop()
  }, [])

  useEffect(() => {
    if (seconds >= 10) {
      router.push('/session-end')
    }
  }, [seconds])

  return (
    <View style={styles.container}>
      <TimerDisplay seconds={seconds} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

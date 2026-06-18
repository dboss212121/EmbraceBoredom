import { useEffect, useRef, useState } from 'react'
import { TouchableOpacity, View, Text, StyleSheet, AppState } from 'react-native'
import { router } from 'expo-router'
import { saveSession } from '../utils/storage'

export default function BeginBoredomScreen() {
  const [seconds, setSeconds] = useState(0)
  const [started, setStarted] = useState(false)

  const intervalRef = useRef<number | null>(null)
  const startTime = useRef<number>(0)
  const lastTick = useRef<number>(0)
  const appState = useRef(AppState.currentState)

  const startTimer = () => {
    if (started) return
    setStarted(true)

    const now = Date.now()
    startTime.current = now
    lastTick.current = now

    intervalRef.current = setInterval(() => {
      const now = Date.now()
      const diff = now - lastTick.current

      // If diff < 3s → normal tick
      // If diff >= 3s → screen was locked → still count elapsed time
      const totalElapsed = Math.floor((now - startTime.current) / 1000)
      setSeconds(totalElapsed)

      lastTick.current = now
    }, 1000)
  }

  useEffect(() => {
    const sub = AppState.addEventListener('change', (nextState) => {
      if (!started) return

      const prev = appState.current
      appState.current = nextState

      // If app goes to background → user left → end session
      if (prev === 'active' && nextState === 'background') {
        endSession()
      }
    })

    return () => sub.remove()
  }, [started])

  const endSession = async () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current)
    }

    // Final calculation to ensure accuracy
    const finalSeconds = Math.floor((Date.now() - startTime.current) / 1000)

    await saveSession(finalSeconds)

    router.replace({
      pathname: '/session-end',
      params: { duration: finalSeconds.toString() },
    })
  }

  return (
    <View style={styles.container}>
      {!started ? (
        <TouchableOpacity style={styles.startButton} onPress={startTimer}>
          <Text style={styles.startText}>Commence Boredom</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.fullscreen} onPress={endSession} activeOpacity={1}>
          <Text style={styles.timer}>{seconds}s</Text>
          <Text style={styles.hint}>Tap anywhere to end</Text>
        </TouchableOpacity>
      )}
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
  startButton: {
    paddingVertical: 20,
    paddingHorizontal: 40,
    backgroundColor: '#222',
    borderRadius: 10,
  },
  startText: {
    color: '#fff',
    fontSize: 22,
  },
  fullscreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timer: {
    color: '#fff',
    fontSize: 48,
    marginBottom: 12,
  },
  hint: {
    color: '#666',
    fontSize: 16,
  },
})

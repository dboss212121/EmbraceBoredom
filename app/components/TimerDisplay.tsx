// Imports
import { View, Text, StyleSheet } from 'react-native'

type Props = {
  seconds: number
}

export default function TimerDisplay({ seconds }: Props) {
  // Component layout
  return (
    <View style={styles.container}>
      <Text style={styles.time}>{seconds}s</Text>
    </View>
  )
}

// Styles
const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 12,
    backgroundColor: '#111',
  },
  time: {
    color: '#fff',
    fontSize: 48,
    textAlign: 'center',
  },
})

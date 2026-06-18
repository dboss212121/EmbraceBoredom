import { View, Text, StyleSheet } from 'react-native'
import { router } from 'expo-router'
import { useEffect, useState } from 'react'

export default function CountdownScreen() {
  const [count, setCount] = useState(3)

  useEffect(() => {
    if (count === 0) {
      router.push('/boredom')
      return
    }

    const timer = setTimeout(() => setCount(count - 1), 1000)
    return () => clearTimeout(timer)
  }, [count])

  return (
    <View style={styles.container}>
      <Text style={styles.count}>{count}</Text>
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
  count: {
    color: '#fff',
    fontSize: 72,
  },
})

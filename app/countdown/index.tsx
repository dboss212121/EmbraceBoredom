import { View, Text, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import type { RootStackParamList } from '../../App'
import { useEffect, useState } from 'react'

export default function CountdownScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const [count, setCount] = useState(3)

  useEffect(() => {
    if (count === 0) {
      navigation.replace('Boredom')
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

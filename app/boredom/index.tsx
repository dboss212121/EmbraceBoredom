import { View, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import type { RootStackParamList } from '../../App'
import { useEffect } from 'react'
import TimerDisplay from '../../components/TimerDisplay'
import { useBoredomTimer } from '../../hooks/useBoredomTimer'

export default function BoredomModeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const { seconds, start, stop } = useBoredomTimer()

  useEffect(() => {
    start()
    return () => stop()
  }, [])

  useEffect(() => {
    if (seconds >= 10) {
      navigation.replace('SessionEnd', { duration: seconds.toString() })
    }
  }, [seconds, navigation])

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

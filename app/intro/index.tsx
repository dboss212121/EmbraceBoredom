import { useState, useEffect, useRef } from 'react'
import { StyleSheet, TouchableOpacity, Animated } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import type { RootStackParamList } from '../../App'
import { PHILOSOPHY } from '../../utils/philosophy'

// Put your intro lines here
const MESSAGES = [
  PHILOSOPHY.intro1,
  PHILOSOPHY.intro2,
  PHILOSOPHY.intro3,
]

export default function IntroSequenceScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const [index, setIndex] = useState(0)
  const fadeAnim = useRef(new Animated.Value(0)).current

  // Fade in whenever the index changes
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start()
  }, [index])

  const handlePress = () => {
    // Fade out first
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      // After fade-out completes:
      if (index < MESSAGES.length - 1) {
        setIndex(index + 1)
      } else {
        navigation.replace('MainMenu')
      }
    })
  }

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress} activeOpacity={1}>
      <Animated.Text style={[styles.text, { opacity: fadeAnim }]}>
        {MESSAGES[index]}
      </Animated.Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  text: {
    color: '#fff',
    fontSize: 22,
    textAlign: 'center',
    lineHeight: 30,
  },
})

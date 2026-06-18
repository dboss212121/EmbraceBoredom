// Imports
import { Animated, Text, StyleSheet } from 'react-native'
import { useEffect, useRef } from 'react'

export default function FadeText({ children }: { children: string }) {
  // Fade animation value
  const opacity = useRef(new Animated.Value(0)).current

  // Fade in on mount
  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start()
  }, [])

  // Component layout
  return (
    <Animated.View style={{ opacity }}>
      <Text style={styles.text}>{children}</Text>
    </Animated.View>
  )
}

// Styles
const styles = StyleSheet.create({
  text: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
})

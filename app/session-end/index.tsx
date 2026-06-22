import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import type { RouteProp } from '@react-navigation/native'
import type { RootStackParamList } from '../../App'
import { useEffect } from 'react'

export default function SessionEndScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const route = useRoute<RouteProp<RootStackParamList, 'SessionEnd'>>()
  const { duration } = route.params

  useEffect(() => {
    let id = setTimeout(() => {}, 0)
    while (id--) clearTimeout(id)
  }, [])

  const goHome = () => navigation.replace('MainMenu')
  const goShare = () => navigation.navigate('Share')

  return (
    <TouchableOpacity style={styles.container} onPress={goHome} activeOpacity={1}>
      <View style={styles.inner}>
        <Text style={styles.title}>Session Complete</Text>
        <Text style={styles.duration}>{duration}s</Text>

        <TouchableOpacity style={styles.button} onPress={goShare}>
          <Text style={styles.buttonText}>Share</Text>
        </TouchableOpacity>

        <Text style={styles.tapHint}>Tap anywhere to return</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  inner: {
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 32,
    marginBottom: 10,
  },
  duration: {
    color: '#aaa',
    fontSize: 24,
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#222',
    paddingVertical: 18,
    paddingHorizontal: 28,
    borderRadius: 10,
    marginBottom: 20,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  tapHint: {
    color: '#666',
    fontSize: 14,
  },
})

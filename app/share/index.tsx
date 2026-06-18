import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { router } from 'expo-router'

export default function ShareBoredomScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Share Your Session</Text>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/progress')}>
        <Text style={styles.buttonText}>View Progress</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondaryButton} onPress={() => router.push('/')}>
        <Text style={styles.secondaryText}>Back to Menu</Text>
      </TouchableOpacity>
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
  title: {
    color: '#fff',
    fontSize: 32,
    marginBottom: 40,
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
  secondaryButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  secondaryText: {
    color: '#888',
    fontSize: 16,
  },
})

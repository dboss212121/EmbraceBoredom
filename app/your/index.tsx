import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { router } from 'expo-router'
import { PHILOSOPHY } from '../../utils/philosophy'

export default function YourBoredomScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Boredom</Text>
      <Text style={styles.body}>{PHILOSOPHY.encouragement}</Text>

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
    padding: 24,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    marginBottom: 20,
  },
  body: {
    color: '#aaa',
    fontSize: 16,
    lineHeight: 22,
  },
  secondaryButton: {
    marginTop: 40,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  secondaryText: {
    color: '#888',
    fontSize: 16,
  },
})

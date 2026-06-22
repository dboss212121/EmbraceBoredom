import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import type { RootStackParamList } from '../../App'
import { PHILOSOPHY } from '../../utils/philosophy'

export default function WhyBoredomScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Why Boredom?</Text>
      <Text style={styles.body}>{PHILOSOPHY.why}</Text>

      <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.navigate('MainMenu')}>
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

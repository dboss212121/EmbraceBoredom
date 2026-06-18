// Imports
import { TouchableOpacity, Text, StyleSheet } from 'react-native'

type Props = {
  label: string
  onPress: () => void
}

export default function MenuButton({ label, onPress }: Props) {
  // Component layout
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  )
}

// Styles
const styles = StyleSheet.create({
  button: {
    backgroundColor: '#222',
    paddingVertical: 18,
    paddingHorizontal: 28,
    borderRadius: 10,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  label: {
    color: '#fff',
    fontSize: 18,
  },
})

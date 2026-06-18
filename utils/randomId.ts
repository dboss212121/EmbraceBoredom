// Generates a simple unique ID
export function randomId() {
  return Math.random().toString(36).substring(2, 10)
}

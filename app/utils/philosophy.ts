// Core philosophy text used across the app
export const PHILOSOPHY = {
  intro1: "Welcome. This app is not here to entertain you.",
  intro2: "It’s here to help you sit with boredom — without escaping.",
  intro3: "Tap to begin your first session.",

  why:
    'When you stop seeking stimulation, your mind reveals what it has been avoiding. Boredom is the first step toward clarity.',

  encouragement:
    'Stay with the feeling. Let the restlessness rise and fall. You are learning to be with yourself.',
}

// Retrieves a specific philosophy block
export function getPhilosophy(key: keyof typeof PHILOSOPHY) {
  return PHILOSOPHY[key]
}

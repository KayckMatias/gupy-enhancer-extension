export const MESSAGE_TYPES = {
  GUPY_INTERCEPT_STEPS: 'GUPY_INTERCEPT_STEPS',
} as const

export type MessageType = keyof typeof MESSAGE_TYPES

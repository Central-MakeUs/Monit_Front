export type EmotionValue = 'soso' | 'necessary' | 'impulse' | 'survival' | 'refresh';

export interface Emotion {
  label: string;
  value: EmotionValue;
  tags: readonly string[];
  description: string;
}

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  height: number;
  startWeight: number;
  targetWeight: number;
  startDate: string;
  swimmingLevel: 'beginner' | 'learning-intermediate' | 'intermediate' | 'advanced';
}

export interface UserSettings {
  theme: 'dark' | 'light';
  notifications: boolean;
  units: 'metric' | 'imperial';
}

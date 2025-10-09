export type UserRole = 'Admin' | 'Educator' | 'Citizen' | 'Legal Expert';
export type Screen =
  | 'onboarding'
  | 'login'
  | 'home'
  | 'admin'
  | 'educator'
  | 'citizen'
  | 'legal'
  | 'quiz'
  | 'discussion'
  | 'profile';

export interface User {
  name: string;
  email: string;
  role: UserRole;
  password?: string;
}



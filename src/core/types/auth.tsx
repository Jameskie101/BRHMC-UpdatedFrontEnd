export interface User {
  id: string;
  email: string;
  roleLevel: number;
  name: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}
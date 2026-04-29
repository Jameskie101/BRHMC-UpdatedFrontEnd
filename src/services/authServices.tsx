// This service will be replaced with real API calls later
export interface LoginResponse {
  token: string;
  roleLevel: number;
  email: string;
}

// Mock user database – replace with API 
const MOCK_USERS = [
  { email: "admin@brhmc.com", password: "admin123", roleLevel: 0 },
  { email: "doctor@brhmc.com", password: "doctor123", roleLevel: 1 },
  { email: "nurse@brhmc.com", password: "nurse123", roleLevel: 2 },
];

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Mock authentication (replace with real API call later)
  const user = MOCK_USERS.find((u) => u.email === email && u.password === password);
  if (!user) {
    throw new Error("Invalid email or password");
  }

  // Remove after backend integration, token would come from the backend
  return {
    token: `mock-jwt-token-${user.roleLevel}`,
    roleLevel: user.roleLevel,
    email: user.email,
  };
};
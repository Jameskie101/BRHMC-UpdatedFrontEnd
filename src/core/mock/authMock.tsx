import type { AuthResponse } from "@/core/types/auth";

export const MOCK_USERS = [
  {
    id: "1",
    email: "admin@brhmc.com",
    password: "admin123",
    roleLevel: 0, // Admin
    name: "Admin User",
    token: "mock-jwt-token-admin",
  },
  {
    id: "2",
    email: "doctor@brhmc.com",
    password: "doctor123",
    roleLevel: 1, // Doctor
    name: "Dr. John Doe",
    token: "mock-jwt-token-doctor",
  },
  {
    id: "3",
    email: "nurse@brhmc.com",
    password: "nurse123",
    roleLevel: 2, // Nurse
    name: "Nurse Jane",
    token: "mock-jwt-token-nurse",
  },
];

export const mockLogin = async (email: string, password: string): Promise<AuthResponse> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const user = MOCK_USERS.find((u) => u.email === email && u.password === password);
  if (!user) {
    throw new Error("Invalid email or password");
  }

  return {
    user: {
      id: user.id,
      email: user.email,
      roleLevel: user.roleLevel,
      name: user.name,
    },
    token: user.token,
  };
};
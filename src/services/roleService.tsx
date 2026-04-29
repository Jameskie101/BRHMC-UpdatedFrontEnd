// This service can later be replaced with an API call
export const getRoleName = async (roleLevel: number | null): Promise<string> => {
  // In production, replace this with an API request:
  // const response = await api.get(`/roles/${roleLevel}`);
  // return response.data.name;

  // Mock mapping (for development only)
  const roleMap: Record<number, string> = {
    0: "Admin",
    1: "Doctor",
    2: "Nurse",
  };
  return roleMap[roleLevel ?? 2] || "User";
};
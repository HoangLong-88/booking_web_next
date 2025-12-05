import { getToken, clearToken } from "@/utils/storeLoginToken";

export const userService = {

  // 1. Update user avatar

  updateAvatar: async (avatar_path: string) => {
    try {
      const token = getToken();
      if (!avatar_path) return;
      const res = await fetch("/api/user/update-avatar", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(avatar_path),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Update avatar failed");
      }
      return data; // { success: true, ... }
    } catch (err: unknown) {
      if (err instanceof Error) throw err;
      throw new Error("Update avatar failed");
    }
  }
};
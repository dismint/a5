import { defineStore } from "pinia";
import { computed, ref } from "vue";

import { fetchy } from "@/utils/fetchy";

export const useUserStore = defineStore(
  "user",
  () => {
    const currentUsername = ref("");

    const isLoggedIn = computed(() => currentUsername.value !== "");

    const resetStore = () => {
      currentUsername.value = "";
    };

    const createUser = async (username: string, password: string) => {
      await fetchy("/api/users", "POST", {
        body: { username, password },
      });
    };

    const loginUser = async (username: string, password: string) => {
      await fetchy("/api/login", "POST", {
        body: { username, password },
      });
    };

    const updateSession = async () => {
      try {
        const { username } = await fetchy("/api/session", "GET", { alert: false });
        currentUsername.value = username;
      } catch {
        currentUsername.value = "";
      }
    };

    const logoutUser = async () => {
      await fetchy("/api/logout", "POST");
      resetStore();
    };

    const updateUserUsername = async (username: string) => {
      await fetchy("/api/users/username", "PATCH", { body: { username } });
    };

    const updateUserPassword = async (currentPassword: string, newPassword: string) => {
      await fetchy("/api/users/password", "PATCH", { body: { currentPassword, newPassword } });
    };

    const deleteUser = async () => {
      await fetchy("/api/users", "DELETE");
      resetStore();
    };

    const getUserId = async () => {
      const { _id } = await fetchy(`/api/users/${currentUsername.value}`, "GET");
      return _id;
    };

    return {
      currentUsername,
      isLoggedIn,
      createUser,
      loginUser,
      updateSession,
      logoutUser,
      updateUserUsername,
      updateUserPassword,
      deleteUser,
      getUserId,
    };
  },
  { persist: true },
);

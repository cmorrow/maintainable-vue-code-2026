import { defineStore } from "pinia";
import { computed, ref } from "vue";

export type Role = "admin" | "editor" | "viewer";

export interface AppUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  initials: string;
}

export interface AppNotification {
  id: number;
  message: string;
  type: "info" | "success" | "warning";
}

const MOCK_USERS: Record<Role, AppUser> = {
  admin: {
    id: "1",
    name: "Alex Rivera",
    email: "alex@acme.co",
    role: "admin",
    initials: "AR",
  },
  editor: {
    id: "2",
    name: "Sam Chen",
    email: "sam@acme.co",
    role: "editor",
    initials: "SC",
  },
  viewer: {
    id: "3",
    name: "Jordan Lee",
    email: "jordan@acme.co",
    role: "viewer",
    initials: "JL",
  },
};

let notifIdCounter = 0;

export const useAppStore = defineStore("app", () => {
  const currentUser = ref<AppUser | null>(null);
  const notifications = ref<AppNotification[]>([]);
  const theme = ref<"dark" | "light">("dark");

  const isAuthenticated = computed(() => currentUser.value !== null);
  const isAdmin = computed(() => currentUser.value?.role === "admin");

  function login(role: Role) {
    currentUser.value = MOCK_USERS[role];
    _addNotification(`Welcome back, ${MOCK_USERS[role].name}!`, "success");
  }

  function logout() {
    const name = currentUser.value?.name;
    currentUser.value = null;
    if (name) _addNotification(`${name} has signed out.`, "info");
  }

  function _addNotification(
    message: string,
    type: AppNotification["type"] = "info"
  ) {
    notifications.value.push({ id: ++notifIdCounter, message, type });
  }

  function dismissNotification(id: number) {
    notifications.value = notifications.value.filter((n) => n.id !== id);
  }

  return {
    currentUser,
    notifications,
    theme,
    isAuthenticated,
    isAdmin,
    login,
    logout,
    dismissNotification,
  };
});

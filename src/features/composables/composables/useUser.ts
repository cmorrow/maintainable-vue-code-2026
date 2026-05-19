import {
  readonly,
  ref,
  toValue,
  watchEffect,
  type MaybeRefOrGetter,
} from "vue";
import type { User } from "@/types";
import { fetchUser } from "../api";

export function useUser(id: MaybeRefOrGetter<string>) {
  const _user = ref<User | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  watchEffect(async () => {
    loading.value = true;
    error.value = null;
    try {
      _user.value = await fetchUser(toValue(id));
    } catch {
      error.value = "Failed to load user";
    } finally {
      loading.value = false;
    }
  });

  return {
    user: readonly(_user),
    loading: readonly(loading),
    error: readonly(error),
  };
}

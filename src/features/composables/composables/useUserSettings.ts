import { readonly, ref, toValue, watchEffect, type MaybeRefOrGetter } from 'vue'
import type { UserSettings } from '@/types'
import { fetchUserSettings } from '../api'

export function useUserSettings(userId: MaybeRefOrGetter<string>) {
  const _settings = ref<UserSettings | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  watchEffect(async () => {
    loading.value = true
    error.value = null
    try {
      _settings.value = await fetchUserSettings(toValue(userId))
    } catch {
      error.value = 'Failed to load settings'
    } finally {
      loading.value = false
    }
  })

  function toggleNotifications() {
    if (_settings.value) {
      _settings.value = { ..._settings.value, notifications: !_settings.value.notifications }
    }
  }

  return {
    settings: readonly(_settings),
    loading: readonly(loading),
    error: readonly(error),
    toggleNotifications,
  }
}

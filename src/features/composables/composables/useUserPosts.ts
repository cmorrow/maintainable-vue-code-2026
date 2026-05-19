import { readonly, ref, toValue, watchEffect, type MaybeRefOrGetter } from 'vue'
import type { Post } from '@/types'
import { fetchUserPosts } from '../api'

export function useUserPosts(userId: MaybeRefOrGetter<string>) {
  const _posts = ref<Post[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  watchEffect(async () => {
    loading.value = true
    error.value = null
    try {
      _posts.value = await fetchUserPosts(toValue(userId))
    } catch {
      error.value = 'Failed to load posts'
    } finally {
      loading.value = false
    }
  })

  return {
    posts: readonly(_posts),
    loading: readonly(loading),
    error: readonly(error),
  }
}

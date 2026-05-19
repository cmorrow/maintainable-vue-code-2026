import { ref, toValue, watchEffect, type MaybeRefOrGetter } from "vue";

export function useCounterWithStart(startingCount: MaybeRefOrGetter<number> = 0) {
  const count = ref(toValue(startingCount));

  watchEffect(() => {
    count.value = toValue(startingCount);
  });

  function increment() {
    count.value++;
  }

  function decrement() {
    count.value--;
  }

  return {
    count,
    increment,
    decrement,
  };
}

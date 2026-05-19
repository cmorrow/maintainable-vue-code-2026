import { defineStore } from "pinia";
import { ref } from "vue";

export const useProvideInjectStore = defineStore("provideInject", () => {
  const showDescription = ref(true);

  return { showDescription };
});

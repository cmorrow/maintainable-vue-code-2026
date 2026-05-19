import { ref } from "vue";
import { useEventListener } from "./useEventListener";

export function useMouse() {
  const x = ref(0);
  const y = ref(0);
  const target = typeof window !== "undefined" ? window : null;

  useEventListener<MouseEvent>(target, "mousemove", (event) => {
    x.value = event.pageX;
    y.value = event.pageY;
  });

  return { x, y };
}

import { onMounted, onUnmounted } from "vue";

type EventListenerOptions = boolean | AddEventListenerOptions | undefined;

export function useEventListener<T extends Event = Event>(
  target: EventTarget | null,
  event: string,
  callback: (event: T) => void,
  options?: EventListenerOptions,
) {
  const listener = callback as EventListener;

  onMounted(() => {
    if (!target) return;
    target.addEventListener(event, listener, options);
  });

  onUnmounted(() => {
    if (!target) return;
    target.removeEventListener(event, listener, options);
  });
}

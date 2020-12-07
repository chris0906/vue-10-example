import { onMounted, onUnmounted } from "vue";

export default function useWindowEvent(eventName, handleKeyDown) {
  onMounted(() => {
    window.addEventListener(eventName, handleKeyDown);
  });

  onUnmounted(() => {
    window.removeEventListener(eventName, () => {});
  });
}

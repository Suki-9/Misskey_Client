import { ref, onMounted, onUnmounted } from "vue";

export const useSwipeMenu = (): void => {
  let startXY: [number, number] = [0, 0];

  const touchXY = ref<[number, number]>([0, 0]),
    maxWidth: number = window.outerWidth * 0.9,
    isOpen = ref<boolean>(false);

  const //Animation
    frameA: Keyframe = { transform: "translateX(0px)" },
    frameB: Keyframe = { transform: `translateX(${maxWidth}px)` },
    options: KeyframeAnimationOptions = { duration: 200, fill: "forwards", easing: `cubic-bezier(0.22, 1, 0.36, 1)` };

  onMounted(() => {
    window.addEventListener("touchstart", e => (startXY = [e.touches[0].pageX, e.touches[0].pageY]));

    window.addEventListener("touchmove", e => (touchXY.value = [e.changedTouches[0].pageX, e.changedTouches[0].pageY]));

    window.addEventListener("touchend", () => {
      if (Math.abs(touchXY.value[0] - startXY[0]) > Math.abs(touchXY.value[1] - startXY[1])) {
        if (touchXY.value[0] - startXY[0] > 0 && !isOpen.value) {
          isOpen.value = true;
          document.getElementById("hoverPage")?.animate([frameA, frameB], options);
        }
        if (touchXY.value[0] - startXY[0] < 0 && isOpen.value) {
          isOpen.value = false;
          document.getElementById("hoverPage")?.animate([frameB, frameA], options);
        }
      }
    });
  });

  onUnmounted(() => window.removeEventListener("touchmove", function () {}));
};

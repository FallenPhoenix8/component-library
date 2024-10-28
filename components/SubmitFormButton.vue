<script setup lang="ts">
import kute from "kute.js"

const { success, isLoading, ringColor, checkColor } = defineProps({
  success: { type: Boolean, default: undefined },
  isLoading: { type: Boolean, default: false },
  ringColor: { type: String, default: "blue" },
  checkColor: { type: String, default: "lime" },
})

function sleep(delay: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay)
  })
}

// Grabbing path element references
const pathRing = ref<SVGPathElement | null>(null)
const pathCheck1 = ref<SVGPathElement | null>(null)
const pathCheck2 = ref<SVGPathElement | null>(null)

const checkMarkSVG = ref<SVGSVGElement | null>(null)

const emit = defineEmits(["submit"])

onMounted(async () => {
  // Saving values in variables
  const ring: SVGPathElement = pathRing.value!
  const check1: SVGPathElement = pathCheck1.value!
  const check2: SVGPathElement = pathCheck2.value!

  // Setting color CSS variables
  ring.style.setProperty("--ring-color", ringColor)
  check1.style.setProperty("--check-color", checkColor)
  check2.style.setProperty("--check-color", checkColor)

  // Setting initial stroke-dasharray and dashoffset
  // by assigning the length of the path
  // to CSS variable
  const lengthRing = ring.getTotalLength()
  const lengthCheck1 = check1.getTotalLength()
  const lengthCheck2 = check2.getTotalLength()
  ring.style.setProperty("--length", `${lengthRing}`)
  check1.style.setProperty("--length", `${lengthCheck1}`)
  check2.style.setProperty("--length", `${lengthCheck2}`)

  // Animation
  if (success) {
    const drawRingTime = 400
    const drawCheckTime = 400
    const drawRing = kute.fromTo(
      ring,
      { draw: "0% 0%" },
      { draw: "0% 100%" },
      { duration: drawRingTime }
    )
    const drawCheck1 = kute.fromTo(
      check1,
      { draw: "0% 0%" },
      { draw: "0% 100%" },
      { duration: drawCheckTime / 2 }
    )
    const drawCheck2 = kute.fromTo(
      check2,
      { draw: "0% 0%" },
      { draw: "0% 100%" },
      { duration: drawCheckTime / 2 }
    )
    drawRing.start()
    await sleep(drawRingTime)
    drawCheck1.start()
    await sleep(drawCheckTime / 2)
    drawCheck2.start()
  } else {
    checkMarkSVG.value!.style.display = "none"
  }
})
</script>
<template>
  <button @click.prevent="emit('submit')" class="btn">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      ref="checkMarkSVG"
    >
      <path
        d="
        M 100, 100
        m 75, 0
        a 75,75 0 1,0 -150,0
        a 75,75 0 1,0  150,0
    "
        fill="none"
        ref="pathRing"
        class="path-ring"
      />
      <path
        d="
    M 75,95
    l 20,20
    
    "
        ref="pathCheck1"
        class="path-check-1"
      />
      <path
        d="
      M 95,115
      l 40,-30
    "
        ref="pathCheck2"
        class="path-check-2"
      ></path>
    </svg>
  </button>
</template>
<style scoped>
svg {
  height: 100%;
}
.path-ring,
.path-check-1,
.path-check-2 {
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 10;
  stroke-dashoffset: var(--length);
  stroke-dasharray: var(--length);
}
.path-ring {
  stroke: var(--ring-color);
}
.path-check-1 {
  stroke: var(--check-color);
}

.path-check-2 {
  stroke: var(--check-color);
}

.btn {
  height: 30px;
}
</style>

<script setup lang="ts">
import kute from "kute.js"

const props = defineProps({
  success: { type: Boolean, default: undefined },
  isLoading: { type: Boolean, default: false },
  ringColor: { type: String, default: "inherit" },
  checkColor: { type: String, default: "inherit" },
  primaryColor: { type: String, default: undefined },
  errorColor: { type: String, default: "inherit" },
  backgroundColor: { type: String, default: "transparent" },
  borderColor: { type: String, default: "inherit" },
  isAttrTailwindClasses: { type: Boolean, default: false },
  textModifierClasses: { type: String, default: "" },
})
enum ButtonState {
  IDLE,
  LOADING,
  SUCCESS,
  ERROR,
}

const state = ref<ButtonState>(ButtonState.IDLE)

function sleep(delay: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay)
  })
}

function animateCircle(circle: SVGCircleElement, loadingCircleTime: number) {
  const animateCircle = kute.fromTo(
    circle,
    {
      opacity: 1,
    },
    {
      opacity: 0.5,
    },
    {
      duration: loadingCircleTime,
    }
  )
  animateCircle.start()
}

// Grabbing checkmark element references
const checkMarkSVG = ref<SVGSVGElement | null>(null)
const pathRingSuccess = ref<SVGPathElement | null>(null)
const pathCheck1 = ref<SVGPathElement | null>(null)
const pathCheck2 = ref<SVGPathElement | null>(null)

// Grabbing loading circle element references
const loadingSVG = ref<SVGSVGElement | null>(null)
const loadingCircle1 = ref<SVGCircleElement | null>(null)
const loadingCircle2 = ref<SVGCircleElement | null>(null)
const loadingCircle3 = ref<SVGCircleElement | null>(null)

// Grabbing error element references
const errorSVG = ref<SVGSVGElement | null>(null)
const pathRingError = ref<SVGPathElement | null>(null)
const pathError1 = ref<SVGPathElement | null>(null)
const pathError2 = ref<SVGPathElement | null>(null)

const emit = defineEmits(["submit"])

onMounted(() => {
  // Saving values in variables
  const ringSuccess: SVGPathElement = pathRingSuccess.value!
  const check1: SVGPathElement = pathCheck1.value!
  const check2: SVGPathElement = pathCheck2.value!

  const ringError: SVGPathElement = pathRingError.value!
  const error1: SVGPathElement = pathError1.value!
  const error2: SVGPathElement = pathError2.value!

  // Setting initial stroke-dasharray and dashoffset
  // by assigning the length of the path
  // to CSS variable
  const lengthRing = ringSuccess.getTotalLength()
  const lengthCheck1 = check1.getTotalLength()
  const lengthCheck2 = check2.getTotalLength()

  ringSuccess.style.setProperty("--length", `${lengthRing}`)
  check1.style.setProperty("--length", `${lengthCheck1}`)
  check2.style.setProperty("--length", `${lengthCheck2}`)

  const lengthRingError = ringError.getTotalLength()
  const lengthError1 = error1.getTotalLength()
  const lengthError2 = error2.getTotalLength()

  ringError.style.setProperty("--length", `${lengthRingError}`)
  error1.style.setProperty("--length", `${lengthError1}`)
  error2.style.setProperty("--length", `${lengthError2}`)
})

const animateCheckMark = async () => {
  // Saving values in variables
  const ring: SVGPathElement = pathRingSuccess.value!
  const check1: SVGPathElement = pathCheck1.value!
  const check2: SVGPathElement = pathCheck2.value!

  // Animation
  if (props.success) {
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
}

const animateErrorX = async () => {
  // Saving values in variables
  const ring: SVGPathElement = pathRingError.value!
  const error1: SVGPathElement = pathError1.value!
  const error2: SVGPathElement = pathError2.value!

  // Animation
  const drawRingTime = 400
  const drawXTime = 400
  const drawRing = kute.fromTo(
    ring,
    { draw: "0% 0%" },
    { draw: "0% 100%" },
    { duration: drawRingTime }
  )
  const drawX1 = kute.fromTo(
    error1,
    { draw: "0% 0%" },
    { draw: "0% 100%" },
    { duration: drawXTime / 2 }
  )
  const drawX2 = kute.fromTo(
    error2,
    { draw: "0% 0%" },
    { draw: "0% 100%" },
    { duration: drawXTime / 2 }
  )
  drawRing.start()
  await sleep(drawRingTime)
  drawX1.start()
  await sleep(drawXTime / 2)
  drawX2.start()
}

const animateLoading = async () => {
  // Saving values in variables
  const circle1 = loadingCircle1.value!
  const circle2 = loadingCircle2.value!
  const circle3 = loadingCircle3.value!

  // Setting helper CSS variables
  circle1.style.setProperty("--order", String(1))
  circle2.style.setProperty("--order", String(2))
  circle3.style.setProperty("--order", String(3))

  // Animation
  // while (isAnimating) {
  //   animateCircle(circle1, loadingCircleTime)
  //   await sleep(loadingCircleTime)
  //   animateCircle(circle2, loadingCircleTime)
  //   await sleep(loadingCircleTime)
  //   animateCircle(circle3, loadingCircleTime)
  //   await sleep(loadingCircleTime)
  // }
}

watch(state, () => {
  if (state.value === ButtonState.SUCCESS) {
    animateCheckMark()
  }
  if (state.value === ButtonState.LOADING) {
    animateLoading()
  }
  if (state.value === ButtonState.ERROR) {
    animateErrorX()
  }
})
</script>
<template>
  <button
    @click.prevent="
      () => {
        emit('submit')
        state = ButtonState.ERROR
      }
    "
    class="btn"
    :class="
      props.isAttrTailwindClasses &&
      `${props.primaryColor} ${props.backgroundColor} ${props.borderColor}`
    "
    :style="
      !props.isAttrTailwindClasses && {
        color: props.primaryColor,
        backgroundColor: props.backgroundColor,
        borderColor: props.borderColor,
      }
    "
  >
    <span :class="{ textModifierClasses, hidden: state !== ButtonState.IDLE }"
      >Submit</span
    >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      ref="checkMarkSVG"
      :class="state === ButtonState.SUCCESS ? 'block' : 'hidden'"
    >
      <path
        d="
        M 100, 100
        m 75, 0
        a 75,75 0 1,0 -150,0
        a 75,75 0 1,0  150,0
    "
        fill="none"
        ref="pathRingSuccess"
        class="path-ring-success"
        stroke="currentColor"
        :style="!props.isAttrTailwindClasses && { color: props.ringColor }"
        :class="props.isAttrTailwindClasses && props.ringColor"
      />
      <path
        d="
    M 75,95
    l 20,20
    
    "
        ref="pathCheck1"
        class="path-check-1"
        stroke="currentColor"
        :style="!props.isAttrTailwindClasses && { color: props.checkColor }"
        :class="props.isAttrTailwindClasses && props.checkColor"
      />
      <path
        d="
      M 95,115
      l 40,-30
    "
        ref="pathCheck2"
        class="path-check-2"
        stroke="currentColor"
        :style="!props.isAttrTailwindClasses && { color: props.checkColor }"
        :class="props.isAttrTailwindClasses && props.checkColor"
      ></path>
    </svg>

    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      ref="errorSVG"
      :class="state === ButtonState.ERROR ? 'block' : 'hidden'"
    >
      <path
        d="
        M 100, 100
        m 75, 0
        a 75,75 0 1,0 -150,0
        a 75,75 0 1,0  150,0
    "
        fill="none"
        ref="pathRingError"
        class="path-ring-error"
        stroke="currentColor"
        :style="!props.isAttrTailwindClasses && { color: props.ringColor }"
        :class="props.isAttrTailwindClasses && props.ringColor"
      />
      <path
        d="
    M 70,70
    l 60,60
    
    "
        ref="pathError1"
        class="path-error-1"
        stroke="currentColor"
        :style="!props.isAttrTailwindClasses && { color: props.errorColor }"
        :class="props.isAttrTailwindClasses && props.errorColor"
      />
      <path
        d="
      M 130,70
      l -60,60
    "
        ref="pathError2"
        class="path-error-2"
        stroke="currentColor"
        :style="!props.isAttrTailwindClasses && { color: props.errorColor }"
        :class="props.isAttrTailwindClasses && props.errorColor"
      ></path>
    </svg>

    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 40"
      :class="state === ButtonState.LOADING ? 'block' : 'hidden'"
      ref="loadingSVG"
      class="loading-circles"
    >
      <circle
        cx="50"
        cy="20"
        r="10"
        fill="currentColor"
        ref="loadingCircle1"
        class="loading-circle"
      />
      <circle
        cx="100"
        cy="20"
        r="10"
        fill="currentColor"
        ref="loadingCircle2"
        class="loading-circle"
      />
      <circle
        cx="150"
        cy="20"
        r="10"
        fill="currentColor"
        ref="loadingCircle3"
        class="loading-circle"
      />
    </svg>
  </button>
</template>
<style scoped>
svg {
  height: 100%;
}
.path-ring-success,
.path-ring-error,
.path-check-1,
.path-check-2,
.path-error-1,
.path-error-2 {
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 10;
  stroke-dashoffset: var(--length);
  stroke-dasharray: var(--length);
}

.btn {
  @apply flex h-10 justify-center items-center overflow-hidden rounded-lg;
}

.btn,
.btn *:not(svg *) {
  @apply transition-all duration-300 ease-in-out;
}

.loading-circle {
  animation: scale-opacity-animate ease-in-out infinite;
  animation-duration: 2s;
  animation-delay: calc(var(--order) * 500ms);
}

@keyframes scale-opacity-animate {
  0% {
    r: 10;
    opacity: 1;
  }
  50% {
    r: 15;
    opacity: 0.5;
  }
  100% {
    r: 10;
    opacity: 1;
  }
}

.loading-circles {
  @apply max-w-20;
}
</style>

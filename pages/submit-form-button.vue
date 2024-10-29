<script setup lang="ts">
const route = useRoute()
const success = ref<Boolean | undefined>(undefined)
const success2 = ref<Boolean | undefined>(undefined)

function sleep(delay: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay)
  })
}

async function submitImaginaryForm(isSuccess: boolean) {
  await sleep(2000)
  return isSuccess
}
</script>
<template>
  <section class="w-full p-10">
    <p>Successful form submission:</p>
    <SubmitFormButton
      :success="success?.valueOf()"
      :is-attr-tailwind-classes="true"
      primary-color="text-slate-400"
      @submit-form="
        () => {
          submitImaginaryForm(true).then((resp) => {
            success = resp
          })
        }
      "
    />

    <p>Error form submission:</p>
    <SubmitFormButton
      :success="success2?.valueOf()"
      :is-attr-tailwind-classes="true"
      primary-color="text-slate-400"
      @submit-form="
        () => {
          submitImaginaryForm(false).then((resp) => {
            success2 = resp
          })
        }
      "
    />
  </section>
</template>

<script setup lang="ts">
const route = useRoute()
</script>
<template>
  <section class="flex w-full p-10 justify-center items-center">
    <SubmitFormButton
      :success="true"
      :is-attr-tailwind-classes="true"
      primary-color="text-slate-400"
    />
  </section>
</template>

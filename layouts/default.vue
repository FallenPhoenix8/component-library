<script setup lang="ts">
const currentRoute = useRoute()
const routes: Ref<{ friendlyName: string; page: string }[]> = ref([])

useHead({
  title: `Component Library - ${String(currentRoute.name)}`,
  bodyAttrs: {
    class: "bg-slate-900",
  },
})

useFetch("/api/get-route-names")
  .then((resp) => {
    routes.value = resp.data.value ?? []
  })
  .catch((err) => {
    console.error(err)
  })
</script>
<template>
  <main
    class="flex flex-col md:flex-row min-h-screen w-full bg-slate-900 text-white"
  >
    <nav class="flex-col min-h-full min-w-40">
      <NuxtLink
        v-for="route in routes"
        :to="route.page"
        class="block capitalize text-slate-400 text-center border-x border-slate-800 transition hover:text-white hover:border-white"
        :class="{
          active:
            route.page == currentRoute.name ||
            (route.page == '/' && currentRoute.name == 'index'),
        }"
      >
        {{ route.friendlyName }}
      </NuxtLink>
    </nav>
    <hr class="block md:hidden border-slate-800" />
    <article class="flex flex-1 justify-center items-center">
      <slot />
    </article>
  </main>
</template>

<style scoped>
.active {
  @apply text-green-700;
}
</style>

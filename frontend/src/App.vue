<script>
import AppHeader from "@/components/AppHeader.vue";

export default {
  components: {
    AppHeader,
  },
};
</script>

<template>
  <div id="app">
    <AppHeader />
    <div class="container mt-3 page">
      <router-view />
    </div>
  </div>
</template>

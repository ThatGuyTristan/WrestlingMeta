<template>
  <v-app>
    <v-main class="main">
      <AppBar />
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import AppBar from "./components/AppBar.vue"
</script>

<style scoped>
.main {
  background: url('./assets/background.jpg');
  background-size: cover;
  height: 100vh;
}
</style>

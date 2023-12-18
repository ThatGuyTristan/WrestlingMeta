<template>
  <v-app>
    <v-main class="main">
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
</script>

<style scoped>
.main {
  background: url('./assets/background.jpg');
  background-size: cover;
  height: 100vh;
}
</style>

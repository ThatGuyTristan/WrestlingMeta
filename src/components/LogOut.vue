<template>
  <v-btn @click="doSignOut"> 
    Sign Out
  </v-btn>
</template>

<script setup>
import { useUserStore } from "../store/userStore"

const doSignOut = async () => {
  const store = useUserStore();
  store.logOut()
}
</script>

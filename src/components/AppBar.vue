<template> 
  <v-app-bar class="bg-black" elevation="0" >
    <v-container class="w-75 mx-auto bg-black ma-0">
      <v-layout class="d-flex justify-end">
      <div v-if="!isSignedIn">
        <SignUp />
        <LogIn />
      </div>
      <div v-else>
        <LogOut />
      </div>
      </v-layout>
    </v-container>
  </v-app-bar>
</template>

<script setup> 
import LogIn from "./LogIn.vue"
import SignUp from "./SignUp.vue"
import LogOut from "./LogOut.vue"

import { useUserStore } from "../store/userStore";
import { computed } from "vue"

const store = useUserStore();
const isSignedIn = computed(() => {
  console.log("????????", store.isSignedIn)
  return store.isSignedIn;
})

</script>

<template>
  <v-btn> Login 
    <v-dialog width="500" :fullscreen="!mdAndUp" v-model="isActive" activator="parent" transition="dialog-bottom-transition"> 
        <v-card class="bg-black"> 
          <v-card-title class="mx-auto"> Sign In </v-card-title>
          <v-card-text> 
            <v-text-field type="email" v-model="email" label="Email"/>
            <v-text-field :type="showPassword ? 'text' : 'password' " v-model="password" label="Password">
              <template v-slot:append-inner>
                <v-icon :icon="showPassword ? 'mdi-eye-outline' : 'mdi-eye-off-outline'" @click="showPassword = !showPassword"></v-icon>
              </template>
            </v-text-field>
            <span v-if="hasError" class="d-flex justify-center text-red"> {{ errorMessage }} </span>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="isActive=false"> Cancel </v-btn>
            <v-spacer />
            <v-btn @click="doLogIn" :disabled="password < minPasswordLength"> Login </v-btn>
          </v-card-actions>
        </v-card>
    </v-dialog>
  </v-btn>
</template>

<script setup> 
import { ref } from "vue"

import {useUserStore} from "../store/userStore"
import { useDisplay } from "vuetify/lib/framework.mjs";

const { mdAndUp } = useDisplay();

const store = useUserStore()

const showPassword = ref(true)
const email = ref("")
const hasError = ref(false)
const isActive = ref(false)
const password = ref("")
const errorMessage = ref("Invalid username or password.")
const minPasswordLength = 8;

const doLogIn = async () => {
  const error = await store.logIn(email.value, password.value)
  
  if (error) {
    hasError.value = true
  } else { 
    isActive.value = false
  }
}
</script>

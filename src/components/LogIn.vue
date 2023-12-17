<template>
  <v-dialog width="500"> 
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props" text="Sign Up">  </v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card> 
        <v-card-text> 
          <v-text-field type="email" v-model="email"/>
          <v-text-field type="password" v-model="password"/>
          <v-text-field type="password" v-model="passwordConfirmation"/>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="createUser(isActive)" :disabled="password != passwordConfirmation"> Cancel </v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup> 
import { ref } from "vue"
import { supabase } from '../plugins/supabase';

const email = ref("")
const password = ref("")
const passwordConfirmation = ref("")

const createUser = async () => {
  const { data, error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
  })
}

const logIn = (isActive) => {
  setTimeout(() => { 
    isActive.value = false
    console.log("signed in!", isActive)
  }, 1500)
}

</script>

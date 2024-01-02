<template>
  <v-btn> Sign Up
    <v-dialog width="500" activator="parent" v-model="isActive"> 
      <v-card> 
        <v-card-title class="mx-auto"> Sign Up </v-card-title>
        <v-card-text> 
          <v-text-field type="email" v-model="email" label="Email"/>
          <v-text-field :type="showPassword ? 'text' : 'password' " v-model="password" label="Password"/>
          <v-text-field v-if="password.length >= minPasswordLength" type="password" v-model="passwordConfirmation" label="Confirm Password"/>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="isActive=false"> Cancel </v-btn>
          <v-spacer />
          <v-btn @click="doSignUp" :disabled="password != passwordConfirmation"> Sign Up </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-btn>
</template>

<script setup> 
import { ref } from "vue"
import { supabase } from "../plugins/supabase"

const email = ref("")
const isActive = ref(false)
const minPasswordLength = 8;
const password = ref("")
const passwordConfirmation = ref("")
const redirectUrl = 'http://localhost:8000'

const doSignUp = async () => {
  console.log("signUp")
  const { data, error } = await supabase.auth.signUp({
  email: email.value,
  password: password.value, 
  options: {
    options: {
      emailRedirectTo: redirectUrl
    }
  }
})

  if (data) { 
    console.log(data)
  } else { 
    console.log(error)
  }
}

</script>

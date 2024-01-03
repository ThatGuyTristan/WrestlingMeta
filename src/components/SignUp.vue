<template>
  <v-btn> Sign Up
    <v-dialog width="500" activator="parent" v-model="isActive" :fullscreen="!mdAndUp" transition="dialog-bottom-transition"> 
      <v-card class="bg-black"> 
        <v-card-title class="mx-auto"> Sign Up </v-card-title>
        <v-card-text> 
          <v-text-field type="email" v-model="email" label="Email"/>
          <v-text-field :type="showPassword ? 'text' : 'password' " v-model="password" label="Password"> 
            <template v-slot:append-inner>
              <v-icon :icon="showPassword ? 'mdi-eye-outline' : 'mdi-eye-off-outline'" @click="showPassword = !showPassword"></v-icon>
            </template>
          </v-text-field>
          <v-text-field v-if="password.length >= minPasswordLength" :type="showPasswordConfirmation ?  'text' : 'password'" v-model="passwordConfirmation" label="Confirm Password"> 
            <template v-slot:append-inner>
              <v-icon :icon="showPassword ? 'mdi-eye-outline' : 'mdi-eye-off-outline'" @click="showPasswordConfirmation = !showPasswordConfirmation"></v-icon>
            </template>
          </v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="isActive=false"> Cancel </v-btn>
          <v-spacer />
          <v-btn @click="doSignUp" :disabled="!isSubmittable"> Sign Up </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-btn>
</template>

<script setup> 
import { ref, computed } from "vue"
import { supabase } from "../plugins/supabase"
import { useDisplay } from "vuetify/lib/framework.mjs";

const { mdAndUp } = useDisplay();
const email = ref("")
const isActive = ref(false)
const minPasswordLength = 8;
const password = ref("")
const passwordConfirmation = ref("")
const redirectUrl = 'http://localhost:8000'
const showPassword = ref(false)
const showPasswordConfirmation = ref(false)

const isSubmittable = computed(() => {
  return email.value && password.value == passwordConfirmation.value && passwordConfirmation.value
})

const doSignUp = async () => {
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

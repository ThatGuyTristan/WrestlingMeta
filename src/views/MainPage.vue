<template>
  <v-app-bar> 
    <v-btn @click="loadShows('wwe')"> WWE </v-btn>
    <v-btn @click="loadShows('aew')"> AEW </v-btn>
    <v-btn @click="loadShows('roh')"> RoH </v-btn>
    <v-btn @click="loadShows('tna')"> TNA </v-btn>
    <v-spacer /> 
    <LogIn v-if="!loggedIn" />
    <v-btn v-else text="Log out" @click="logOut"> </v-btn>
  </v-app-bar>
  <v-container> 
    <h1> Shows from {{ company.toUpperCase() }} </h1>
    <ShowCard v-for="show in shows" :key="show.id" />
  </v-container>
</template>

<script setup>
import { onMounted, ref } from "vue"
import { supabase } from "../plugins/supabase";
import LogIn from "../components/LogIn.vue";
import ShowCard from "../components/ShowCard.vue"

const loggedIn = ref(false)
const company = ref('wwe')
const shows = ref([])

const logOut = () => {
  console.log("logged out")
}

const loadShows = async (show) => {
  console.log("eeee", show)

  const { data, error } = await supabase
    .from('shows')
    .select()
    .eq('company', show)

  console.log("D", data, "E", error)
}

onMounted(() => {
  loadShows('wwe')
})
</script>
<template>
  <v-container class="w-75 h-100vh mx-auto bg-grey">
    <div class="d-flex justify-center">
      <v-btn class="company-button ma-2 pa-2" id="wwe-button" @click="loadShows(1)" />
      <v-btn class="company-button ma-2 pa-2" id="aew-button" @click="loadShows(2)" />
      <v-btn class="company-button ma-2 pa-2" id="roh-button" @click="loadShows(3)" />
      <v-btn class="company-button ma-2 pa-2" id="tna-button" @click="loadShows(4)" />
    </div>
    <h1 class="ml-4"> {{ company.toUpperCase() }} Shows </h1>
    <div v-if="shows.length > 0">
      <ShowCard v-for="show in shows" :show="show" :key="show.id" />
    </div>
  </v-container>
</template>

<script setup>
import { onMounted, ref } from "vue"
import { supabase } from "../plugins/supabase";
import ShowCard from "../components/ShowCard.vue"

const company = ref('wwe')
const shows = ref([])

const loadShows = async (company_id) => {
  let { data, error } = await supabase
    .from('shows')
    .select('*')
    .eq('company_id', company_id)

    if(data){ 
      shows.value = data
    } else {
      console.log(error)
    }
}

onMounted(() => {
  loadShows(1)
})
</script>

<style scoped>
.company-button {
  width: 100px;
  height: 100px;
  max-height: 100px;
  max-width: 100px;
}

#wwe-button {
  background: url('../assets/wwe.png');
  background-size: cover;
}

#aew-button { 
  background: url('../assets/aew.png');
  background-size: cover;
}

#roh-button { 
  background: url('../assets/roh.png');
  background-size: cover;
}
#tna-button { 
  background: url('../assets/tna.png');
  background-size: cover;
}
</style>
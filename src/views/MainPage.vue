<template>
  <v-container class="mx-auto px-0 px-md-2 bg-black" :class="mdAndUp ? 'w-75' : 'w-100'">
    <div class="d-flex justify-center mb-4">
      <v-btn class="company-button ma-2 pa-2" @click="loadShows(1)" text="WWE"/>
      <v-btn class="company-button ma-2 pa-2" @click="loadShows(2)" text="AEW" />
      <v-btn class="company-button ma-2 pa-2" @click="loadShows(3)" text="ROH"/>
      <v-btn class="company-button ma-2 pa-2" @click="loadShows(4)" text="TNA"/>
    </div>
    <div class="d-flex justify-center text-subtitle-2 mb-2"> {{  showDisclaimer }}</div>
    <h1 class="d-flex justify-center"> {{ COMPANIES[companyId].toUpperCase() }} Shows </h1>
    <div v-if="shows.length > 0">
      <CompanyCard :companyId="companyId"/>
    </div>
  </v-container>
</template>

<script setup>
import { COMPANIES } from "../constants/companies";
import { showDisclaimer } from "../constants/showDisclaimer";
import { supabase } from "../plugins/supabase";
import { onMounted, ref } from "vue"

import CompanyCard from "../components/CompanyCard.vue"
import { useDisplay } from "vuetify/lib/framework.mjs";

const { mdAndUp } = useDisplay()


const companyId = ref(1)
const shows = ref([])

const loadShows = async (id) => {
  companyId.value = id

  const { data, error } = await supabase
    .from('shows')
    .select('*')
    .eq('company_id', companyId.value)

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
  background-color: black;
  color: whitesmoke;
  border-width: 1px;
  border-color: white;
  width: 100px;
  height: 50px;
  max-height: 100px;
  max-width: 100px;
}

</style>

<template>
  <v-expansion-panels variant="accordion">
      <ShowCard :show="show" v-for="show in shows" :key="show.id" />
  </v-expansion-panels>
</template>

<script setup>
import { supabase } from "../plugins/supabase"

import { onMounted, ref, defineProps } from "vue";

import ShowCard from "./ShowCard.vue";

const loading = ref(false)
const shows = ref([])

const props = defineProps({
  companyId: Number
})

const getShows = async () => {
  loading.value = true

  const { data, error } = await 
    supabase
      .from("shows")
      .select()
      .eq('company_id', props.companyId)

    if(data){ 
      shows.value = data
    } else {
      console.log(error)
    }
}

onMounted(() => {
  getShows()
})
</script>

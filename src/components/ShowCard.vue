<template>
  <v-expansion-panel class="rounded-0">
    <v-expansion-panel-title class="bg-black d-flex justify-center">
      {{ show.brand }} {{ show.date }}
    </v-expansion-panel-title>
    <v-expansion-panel-text class="bg-black">
      <div v-if="!loading" class="w-full"> 
        <MatchCard v-for="match in matches" :key="match.id" :match="match" />
      </div>
      <div v-else>
        Loading . . .
      </div>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>

<script setup>
import { ref, defineProps, onMounted } from "vue"
import MatchCard from "./MatchCard.vue"
import { supabase } from "../plugins/supabase";

const props = defineProps({
  show: Object
})
const loading = ref(false)
const matches = ref([])

const getMatches = async () => {
  loading.value = true
  let { data, error } = await 
    supabase
      .from('matches')
      .select("*")
      .eq('show_id', props.show.id )

  if(data) { 
    matches.value = data
  } else { 
    console.log(error)
  }
  loading.value = false
}


onMounted(() => {
  getMatches();
})

</script>
<style scoped>
.v-expansion-panel-text>>> .v-expansion-panel-text__wrapper {
  padding: 0 !important;
}

</style>
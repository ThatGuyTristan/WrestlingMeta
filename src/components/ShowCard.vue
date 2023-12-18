<template>
  <v-container fluid> 
    <v-card v-if="show" class="rounded-0"> 
      <v-card-title> 
        {{ show.brand }} {{ show.date }}
      </v-card-title>
      <v-card-text>
        <h3> Matches: </h3>
        <div v-if="!loading" class="w-full"> 
          <MatchCard v-for="match in matches" :key="match.id" :match="match" />
        </div>
        <div v-else>
          Loading . . .
        </div>
      </v-card-text>
    </v-card>
  </v-container>
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
  let { data, error } = await supabase.from('matches').select('*').eq('show_id', props.show.id )

  if(data) { 
    console.log("DATA", data)
    matches.value = data
    console.log("Matches.value", matches.value)
  } else { 
    console.log(error)
  }
  loading.value = false
}


onMounted(() => {
  getMatches();
})

</script>

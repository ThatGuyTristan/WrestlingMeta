<template>
  <v-container fluid> 
    <v-card v-if="showData"> 
      <v-card-title> {{ showData.record }}</v-card-title>
      <v-card-text>
        <MatchCard v-for="match in showData.matches" :key="match.id" :match="match" />
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted, defineProps } from "vue"
import MatchCard from "./MatchCard.vue"
import { supabase } from "../plugins/supabase";

const props = defineProps({
  id: Number
})
const showData = ref(null)

const getShowData = async () => {
  supabase.from('shows').eq('id', props.showId ).select()
}


onMounted(() => {
  getShowData
})

</script>

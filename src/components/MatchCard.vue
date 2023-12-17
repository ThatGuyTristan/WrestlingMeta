<template>
  <v-card> 
    <v-container fluid class="d-flex justify-space-between"> 
      <div> 
        <div class="text-caption">Match</div>
        {{ match.name }}
      </div>
      <div> 
        <div class="text-caption">Stipulation</div>
        {{ match.stipulation }}
      </div>
      <div>
        <div class="text-caption">Result</div>
        {{  match.result }}
      </div>
      <div>
        <div class="text-caption">Your Rating</div>
        <v-slider v-model="rating" :min="0" :max="5" :step="1" show-ticks :disabled="hasVote" :ticks="tickLabels" />
        <v-btn @click="doVote"> Vote !</v-btn>
      </div>
      <div>
        <v-slider v-model="collectiveRating" :min="0" :max="5" :step="1" show-ticks readonly ticks="tickLabels" />
      </div>
    </v-container>
  </v-card>
</template>

<script setup> 
import { supabase } from "../plugins/supabase"
import { computed, defineProps, ref } from "vue"

const rating = ref(0)
const existingVote = ref(null)
const props = defineProps({
  match: Object
})

const tickLabels = { 1: '1', 2: '2', 3: '3', 4: '4', 5: '5'} 

const doVote = async () => {
  const { data, error } = await supabase
  .from('match_votes')
  .insert({ id: props.match.id, rating: rating.value })
  .select()  

  if(data) { 
    existingVote.value = data[0].id
  } else {
    console.log(error)
  }
}

const hasVote = computed(() => {
  return existingVote.value ? true : false
})
</script>
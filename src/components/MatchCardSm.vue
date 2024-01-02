<template>
  <v-container fluid class="my-0 py-1">
    <v-card class="rounded-0" flat variant="outlined">
      <v-card-text class="bg-black mx-0 px-1">
        <v-row no-gutters>
          <v-col cols="8">
            <div class="d-flex justify-center"> {{ match.name }} </div>
            <div class="d-flex justify-center"> {{ match.stipulation }} </div>
            <div class="d-flex justify-center"> {{ match.result }} </div>
          </v-col>
          <v-col cols="2">
            <div class="text-caption mx-auto mt-2"> <h1> {{ averageRating }} </h1> </div> 
            <div class="mx-auto mt-2"> {{ votesCast }} votes </div>
          </v-col>
          <v-col class="mx-auto my-auto">
          <div> 
            <VoteDialog v-if="isSignedIn" :matchId="match.id" :userId="userId" :matchName="match.name" />
          </div>
          </v-col>
        </v-row>
      </v-card-text> 
    </v-card>
  </v-container>
</template>

<script setup> 
import { defineProps, computed, onMounted, ref } from "vue"
import { useUserStore } from "../store/userStore"
import { supabase } from "../plugins/supabase"

import VoteDialog from "./VoteDialog.vue"

const store = useUserStore()
const votesCast = ref(0)
const averageRating = ref(0)

const getRating = async () => {
  const { data, error } = await supabase.rpc('get_match_rating', { match_id: props.match.id })
  if(data[0]) { 
    votesCast.value = data[0].count
    averageRating.value = data[0].average_rating
  } else { 
    console.log(error)
  }
}

const isSignedIn = computed(() => {
  return store.isSignedIn
})

const props = defineProps({
  match: Object
})

const match = computed(() => {
  return props.match
})

const userId = computed(() => {
  return store.session.user.id
})

onMounted(() => {
  getRating();
})

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@300&display=swap');

div { font-family: 'Oswald', sans-serif; }
</style>

<template>
  <v-container fluid class="my-0 py-1">
    <v-hover v-slot="{ isHovering, props }">
    <v-card v-bind="props" class="rounded-0" flat :variant="isHovering ? 'outlined' : 'plain' ">
      <v-card-text class="bg-black">
        <v-row no-gutters class="my-2">
          <v-col cols="3">
            <div class="text-caption font-weight-black d-flex justify-center">Match</div>
            <div class="d-flex justify-center"> {{ match.name }} </div>
          </v-col>
          <v-col cols="3">
            <div class="text-caption font-weight-black d-flex justify-center">Stipulation</div>
            <div class="d-flex justify-center"> {{ match.stipulation }} </div>
          </v-col>
          <v-col cols="3">
            <div class="text-caption font-weight-black d-flex justify-center">Result</div>
            <div class="d-flex justify-center"> {{ match.result }} </div>
          </v-col>
          <v-col cols="2">
            <div class="text-caption font-weight-black d-flex justify-center"> Audience Rating </div>
            <div class="text-caption d-flex justify-center"> {{ votesCast }} votes cast </div>
            <div class="d-flex justify-center"> {{  averageRating }} </div>
          </v-col>
          <v-col cols="1">
            <div class="text-caption font-weight-black d-flex justify-center"> Your Vote </div>
            <div class="d-flex justify-center"> 
              <VoteDialog v-if="isSignedIn" :matchId="match.id" :userId="userId" :matchName="match.name" />
            </div>
          </v-col>
        </v-row>
      </v-card-text> 
    </v-card>
  </v-hover>
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
  console.log("gR", data )
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

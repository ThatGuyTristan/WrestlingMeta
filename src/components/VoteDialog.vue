<template>
  <v-btn> Vote 
    <v-dialog persistent width="auto" v-model="isActive" activator="parent">
      <v-card>
        <v-card-title> {{ matchName }}</v-card-title>
        <v-card-text> 
          <v-slider v-model="rating"/>
        </v-card-text> 
        <v-card-actions>
          <v-btn @click="isActive=false"> Cancel </v-btn>
          <v-spacer />
          <v-btn @click="doVote()"> Submit</v-btn> 
        </v-card-actions>
      </v-card>
    </v-dialog> 
  </v-btn> 
</template>

<script setup> 
import { ref, defineProps } from "vue" 
import { supabase } from "../plugins/supabase"

const props = defineProps({
  matchName: String,
  matchId: Number,
  userId: Number
})

const rating = ref(0)
let isActive = ref(false)

const doVote = async () => {
  console.log("here")
  const { data, error } = await supabase
    .from("match_votes")
    .insert({ id: props.matchId, user_id: props.userId, rating: rating.value })
    .select()

  if(!error){
    console.log(data)
  } else {
    console.log(error)
  }
  isActive.value = false

}
</script>
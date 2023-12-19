<template>
  <v-btn> {{ buttonText }} 
    <v-dialog persistent width="500" v-model="isActive" activator="parent">
      <v-card>
        <v-card-title class="mx-auto"> {{ matchName }}</v-card-title>
        <v-card-subtitle class="mx-auto"> Give your rating </v-card-subtitle>
        <v-card-text> 
          <v-slider 
            v-model="rating" 
            show-ticks="always" 
            thumb-label 
            :ticks="tickLabels"
            :step="step" 
            :min="min" 
            :max="max"
            :color="colors[rating]"
            >
            <template v-slot:prepend>
              <v-btn
                size="small"
                variant="text"
                icon="mdi-minus"
                @click="decrement"
              ></v-btn>
            </template>

            <template v-slot:append>
              <v-btn
                size="small"
                variant="text"
                icon="mdi-plus"
                @click="increment"
              ></v-btn>
            </template>

          </v-slider>
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
import { ref, defineProps, computed } from "vue" 
import { supabase } from "../plugins/supabase"

import { useUserStore } from "../store/userStore";

const store = useUserStore();
const buttonText = computed(() => {
 return store.isSignedIn ? 'VOTE' : 'Sign in to Vote';
})

const props = defineProps({
  matchName: String,
  matchId: Number,
  userId: Number
})

const colors = ref({
  "1": "red",
  "2": "orange",
  "3": "black",
  "4": "green",
  "5": "blue"
})

const tickLabels = ref({
  1: "1",
  2: "2",
  3: "3",
  4: "4",
  5: "5"
})

const min = ref(1)
const max = ref(5)
const step = ref(1)

const increment = () => {
  rating.value++
}

const decrement = () => {
  rating.value--
}

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
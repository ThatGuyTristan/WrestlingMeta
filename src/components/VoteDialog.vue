<template>
  <v-btn :disabled="voteLocked" :loading="loading" :block="!mdAndUp" variant="outlined" color="white" rounded="0"> {{ voteLocked ? rating : buttonText }} 
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
import { ref, defineProps, computed, onMounted } from "vue" 
import { supabase } from "../plugins/supabase"

import { useUserStore } from "../store/userStore";
import { useDisplay } from "vuetify"

const { mdAndUp } = useDisplay();
const store = useUserStore();
const loading = ref(false)
const buttonText = computed(() => {
 return store.isSignedIn ? 'VOTE' : 'Sign in to Vote';
})

const props = defineProps({
  matchName: String,
  matchId: Number,
  // userId: Number
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
const voteLocked = ref(false)
const isActive = ref(false)

const userId = computed(() => {
  return store.session.user.id
})

const getVote = async () => {
  loading.value = true;
  const { data } = await supabase.from("votes").select().eq('match_id', props.matchId, 'user_id', userId )
  console.log("VOTE!!", data)
  if(data[0]) {
    console.log("DATA", data)
    voteLocked.value = true
    rating.value = data[0].rating
  }
  loading.value = false;
}

onMounted(() => {
  getVote()
})

const doVote = async () => {
  const userId = store.session.user.id

  const { data, error } = await supabase
    .from("votes")
    .insert({ 
      match_id: props.matchId, 
      user_id: userId, 
      rating: rating.value 
    })
    .select()

  if(data){
    voteLocked.value = true
  } else {
    console.log(error)
  }
  isActive.value = false

}
</script>
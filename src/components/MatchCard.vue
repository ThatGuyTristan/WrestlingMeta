<template>
  <v-container fluid> 
    <v-card class="rounded-0">
      <v-card-text>
        <v-row no-gutters>
          <v-col cols="3">
            <div class="text-caption font-weight-black">Match</div>
            {{ match.name }}
          </v-col>
          <v-col cols="3">
            <div class="text-caption font-weight-black">Stipulation</div>
            {{ match.stipulation }}
          </v-col>
          <v-col cols="3">
            <div class="text-caption font-weight-black">Result</div>
            {{  match.result }}
          </v-col>
          <v-col cols="2">
            <div class="text-caption font-weight-black"> Audience Rating </div>
              4.5
          </v-col>
          <v-col cols="1">
            <VoteDialog v-if="isSignedIn" :matchId="match.id" :userId="userId" :matchName="match.name" />
          </v-col>
        </v-row>
      </v-card-text> 
    </v-card>
  </v-container>
</template>

<script setup> 
import { defineProps, computed } from "vue"
import { useUserStore } from "../store/userStore"

import VoteDialog from "./VoteDialog.vue"

const store = useUserStore()
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
  return 1
})


</script>
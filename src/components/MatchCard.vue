<template>
  <v-container fluid> 
    <v-card class="rounded-0">
      <v-card-text>
        <v-row no-gutters>
          <v-col>
            <div class="text-caption font-weight-black">Match</div>
            {{ match.name }}
          </v-col>
          <v-col>
            <div class="text-caption font-weight-black">Stipulation</div>
            {{ match.stipulation }}
          </v-col>
          <v-col>
            <div class="text-caption font-weight-black">Result</div>
            {{  match.result }}
          </v-col>
          <v-col>
            <div class="text-caption font-weight-black"> Rating </div>
              4.5
          </v-col>
          <v-col cols="1">
            <VoteDialog :matchId="match.id" userId="3" :matchName="match.name" />
          </v-col>
        </v-row>
      </v-card-text> 
    </v-card>
  </v-container>
</template>

<script setup> 
import { defineProps } from "vue"
import VoteDialog from "./VoteDialog.vue"

const props = defineProps({
  match: Object
})

console.log("M", props.match )

</script>
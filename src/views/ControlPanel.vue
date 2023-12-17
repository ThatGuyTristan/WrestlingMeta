<template>
  <v-container class="w-75 mx-auto">
    <v-row class="mx-auto"> 
      <v-col sm="12" md="9" >
        <v-card>
          <v-card-title> New Show </v-card-title>
          <v-card-text class="p-2">
            <div class="p-0 m-0">
              <div class="w-50 d-inline">
                <v-select label="Company" v-model="show.company" :items="['AEW', 'ROH', 'TNA', 'WWE']" />
              </div>
              <div class="w-50 d-inline">
                <v-text-field type="number" label="Month" v-model="showMonth" />
                <v-text-field type="number" label="Day" v-model="showDay" />
                <v-text-field type="number" label="Year" v-model="showYear" /> 
              </div>
            </div>
            
            <div class="d-flex"> 
              <div class="w-50 mr-2">
                <v-text-field label="Brand" v-model="show.brand"> </v-text-field>
              </div>
              <div class="w-50">
                <v-text-field label="Name" v-model="show.name"> </v-text-field>            
              </div>
            </div>
            
            <v-spacer vertical />
            <v-row v-for="(match, i) in show.matches" :key="match.name">
              <v-col sm="12" md="3"> 
                <v-text-field v-model="show.matches[i]['name']" label="Match" />  
              </v-col>
              <v-col sm="12" md="3">
                <v-text-field v-model="show.matches[i]['stipulation']" label="Stipulation" /> 
              </v-col>
              <v-col sm="12" md="3">
                <v-text-field v-model="show.matches[i]['result']" label="Result" /> 
              </v-col>
              <v-col sm="12" md="3">
                <v-btn class="h-full w-full" v-if="i == show.matches.length - 1" @click="addMatch"> + Add Match</v-btn>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn @click="doSubmit" color="success"> Save Show </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup> 
import { supabase } from "../plugins/supabase"
import { ref, computed } from "vue";

const showYear = ref("")
const showMonth = ref("")
const showDay = ref("")

const dateString = computed(() => {
  return `${showYear.value} / ${showMonth.value} / ${showDay.value}`
})

const addMatch = () => {
  show.value.matches.push({ name: "", stipulation: "", result: "" })
}

const show = ref({
  company: "",
  brand: "",
  name: "",
  date: dateString.value,
  matches: [
    {
      name: "",
      stipulation: "",
      result: ""
    }
  ]
})

const doSubmit = async () => {
  const { data, error } = await supabase
    .from('shows')
    .insert({ 
      company: show.value.company.toLowerCase(), 
      brand: show.value.brand, 
      name: show.value.name, 
      date: dateString.value })
    .select()

    if(error){
      console.log(error);
      return false
    }

    const showId = data[0]['id']

    const matches = show.value.matches.map(obj => ({ ...obj, show_id: showId }))
    
    const { matchesData, matchesError } = await supabase
      .from()
      .insert(matches)
      .select()

    if(matchesError) {
      console.log(matchesError);
      return false
    } else if ( matchesData ){ 
      console.log(matchesData)
    }
}

</script>
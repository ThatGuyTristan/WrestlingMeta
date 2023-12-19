import { computed, ref } from "vue"
import { defineStore } from 'pinia'
import { supabase } from '../plugins/supabase';

export const useUserStore = defineStore('user',  () => {
  let session = ref({ 
    access_token: "",
    expires_at: 0,
    expires_in: 0,
    refresh_token: "",
    token_type: "",
    user: { }
  })

  const isSignedIn = computed(() => {
    if(!session.value) return false
    return session.value.access_token ? true : false
  })
  
  const logIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password, 
    })
    
      console.log("doLogin", data)
    
      if (data.session) {
        session.value = data.session
      } else if (error) { 
        console.log("logIn:", error)
        return error
      }
  }

  const logOut = async () => {
    const { error } = await supabase.auth.signOut()

    if (error) {
      console.log(error)
    } else {
      return true
    }
  }

  const updateSession = (data) => {
    session.value = data.session
  }

  const refresh = async () =>  {
    const { data, error } = await supabase.auth.refreshSession(session.value.refresh_token)
    if (error) console.log('Error refreshing session:', error.message)
    else console.log('Session refreshed successfully:', data)
  }

  return { 
    logIn, 
    logOut, 
    isSignedIn, 
    updateSession, 
    refresh, 
    session
  }
})


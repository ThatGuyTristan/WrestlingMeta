import { ref, watchEffect } from "vue"
import { defineStore } from 'pinia'
import { supabase } from '../plugins/supabase';

export const useUserStore = defineStore('user',  () => {
  const session = ref({ 
    access_token: "",
    expires_at: 0,
    expires_in: 0,
    refresh_token: "",
    token_type: "",
    user: { }
  })

  const userFromStorage = JSON.parse(localStorage.getItem("sb-ykprzcvwefhdanrgmcdc-auth-token"))
  const isSignedIn = ref(false)

  if (userFromStorage) {
    session.value = userFromStorage
  }

  watchEffect( () => {
    isSignedIn.value = session.value.access_token ? true : false
  })

  const logIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password, 
    })
    
      if (data.session) {
        session.value = data.session
      } else if (error) { 
        return error
      }
  }

  const logOut = async () => {
    const { error } = await supabase.auth.signOut()

    if (error) {
      console.log(error)
    } else {
      deleteSession();
      return true
    }
  }

  const deleteSession = () => {
    Object.keys(session.value).forEach((i) => session.value[i] = null);
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


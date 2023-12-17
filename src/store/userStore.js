import { defineStore } from 'pinia'
import { ref } from "vue"

export const useUserStore = defineStore('user',  () => {
  const admin = ref(true)
  const toggleAdmin = () => {
      admin.value = !admin.value }

  return { admin, toggleAdmin }
})

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlrcHJ6Y3Z3ZWZoZGFucmdtY2RjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDI4NDM4MTgsImV4cCI6MjAxODQxOTgxOH0.naX17xdgfwDhWB2j_Rq6xsbuvF6Nj_dVMCqcNeFvPJQSUPABASE_URL

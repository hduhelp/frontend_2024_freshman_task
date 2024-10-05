import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    userData: {
      username: 'Guest',
      email: ''
    }
  }),
  actions: {
    setUserData(data) {
      this.userData = data
    },
    clearUserData() {
      this.userData = {
        username: 'Guest',
        email: ''
      }
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'user-data', 
        storage: localStorage,
      }
    ]
  }
})

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
      this.userData = { ...this.userData, ...data }
    },
    clearUserData() {
      this.userData = this.$state.userData
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

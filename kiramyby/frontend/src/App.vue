<script setup>
import { RouterView } from 'vue-router'

const links = [
  { name: 'home', path: '/home', icon: 'mdi-home-outline' },
  { name: 'ask', path: '/ask', icon: 'mdi-bell-outline' }
]
</script>

<template>
  <v-app id="inspire">
    <v-app-bar class="px-3" density="comfortable">
      <v-app-bar-title >Q&A Platform</v-app-bar-title>
      <v-btn-group>
        <v-btn v-for="link in links" :key="link.name" :prepend-icon="link.icon" text @click="$router.push(link.path)">
          {{ link.name }}
        </v-btn>
      </v-btn-group>
    </v-app-bar>

    <v-main>
      <!-- Where Views Insert -->
      <RouterView></RouterView>
    </v-main>
  </v-app>
</template>

<style scoped>
.v-main {
  background-color: rgb(241, 241, 241); /* bg-grey-lighten-3 */
}
</style>

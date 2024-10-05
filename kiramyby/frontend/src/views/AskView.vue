<script setup>
import { computed } from 'vue'
import { useUserStore } from '@/stores/userStore'

import AvatarGetter from '@/components/AvatarGetter.vue'
import ProfileEditor from '@/components/ProfileEditor.vue'
import AskEditor from '@/components/AskEditor.vue'

const userStore = useUserStore()
const userData = computed(() => userStore.userData)
</script>

<template>
  <v-container>
    <div class="d-flex justify-center pa-4 text-center">
      <v-row>
        <v-col class="d-flex flex-column align-center justify-center">
          <!-- Where Components Insert -->
          <AvatarGetter :email="userData.email" size="64" />
          <v-sheet class="text" style="background-color: transparent">
            {{ userData.username }}
          </v-sheet>
          <v-sheet class="text" style="background-color: transparent">
            {{ userData.email }}
          </v-sheet>
          <ProfileEditor />
        </v-col>
      </v-row>
    </div>
    <v-divider></v-divider>
    <AskEditor />
  </v-container>
</template>

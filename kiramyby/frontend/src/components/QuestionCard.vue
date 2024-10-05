<script setup>
import { computed } from 'vue'
import AvatarGetter from './AvatarGetter.vue'

const props = defineProps({
  id: Number,
  question: String,
  author: String,
  author_email: String,
  time: String,
  detail: String,
  standard: Boolean,
  unsolved: Boolean
})

const formattedDate = computed(() => {
  if (!props.time) return 'Date???'
  const date = new Date(props.time)
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
})

const summaryDetail = computed(() => {
  if (props.detail.length >= 300) return props.detail.substring(0, 300) + '...'
  return props.detail
})
</script>

<template>
  <v-container fluid>
    <v-card v-if="standard" class="mx-auto" elevation="7">
      <v-card-item>
        <v-card-title text-center>
          {{ question }}
        </v-card-title>
        <template v-slot:append>
          <v-icon v-if="!unsolved" icon="mdi-check"></v-icon>
          <AvatarGetter :email="author_email" size="32" />
        </template>
        <v-card-subtitle>
          {{ `${author} ${formattedDate}` }}
        </v-card-subtitle>
      </v-card-item>
      <v-card-text>
        {{ detail }}
      </v-card-text>
    </v-card>

    <v-card v-else class="mx-auto" hover link @click="$router.push(`/question/${props.id}`)">
      <v-card-item>
        <v-card-title text-center>
          {{ question }}
        </v-card-title>
        <template v-slot:append>
          <v-icon v-if="!unsolved" icon="mdi-check"></v-icon>
          <AvatarGetter :email="author_email" size="32" />
        </template>
        <v-card-subtitle>
          {{ `${author} ${formattedDate}` }}
        </v-card-subtitle>
      </v-card-item>
      <v-card-text>
        {{ summaryDetail }}
      </v-card-text>
    </v-card>
  </v-container>
</template>

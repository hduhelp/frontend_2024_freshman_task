<script setup>
import { computed } from 'vue'
import AvatarGetter from './AvatarGetter.vue'

const props = defineProps({
  id: Number,
  content: String,
  author: String,
  email: String,
  time: String,
  is_best: Boolean
})

const formattedDate = computed(() => {
  if (!props.time) return 'Date???'
  const date = new Date(props.time)
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
})
</script>

<template>
  <v-container fluid>
    <v-card class="mx-auto">
      <v-card-text class="text-h6 py-2">
        {{ content }}
      </v-card-text>

      <v-card-actions>
        <v-list-item class="w-100">
          <template v-slot:prepend>
            <AvatarGetter :email="props.email" size="40" />
          </template>

          <v-list-item-title>{{ author }}</v-list-item-title>

          <v-list-item-subtitle> {{ formattedDate }}</v-list-item-subtitle>

          <template v-slot:append>
            <div class="justify-self-end">
              <v-icon class="me-1" icon="mdi-arrow-up-bold-outline"></v-icon>
              <span class="subheading me-2">*</span>
              <span class="me-1">/</span>
              <v-icon class="me-1" icon="mdi-arrow-down-bold-outline"></v-icon>
              <span class="subheading">*</span>
            </div>
          </template>
        </v-list-item>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

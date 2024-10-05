<script setup>
import md5 from 'md5'
import { computed } from 'vue'

const props = defineProps({
  email: {
    type: String,
    required: true,
  },
  size: {
    type: [Number, String],
    default: 32
  }
})

// get avatar from gravatar
const getAvatar = computed(() => {
  const encodedEmail = md5(props.email.trim().toLowerCase())
  return `https://secure.gravatar.com/avatar/${encodedEmail}?s=${props.size}`
})
</script>

<template>
  <v-avatar :size="props.size"><v-img alt="Avatar" :src="getAvatar"></v-img></v-avatar>
</template>

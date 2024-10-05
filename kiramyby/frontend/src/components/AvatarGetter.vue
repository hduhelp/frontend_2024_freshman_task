<script setup>
import md5 from 'md5'
import { computed } from 'vue'

const props = defineProps({
  email: String,
  size: String
})

// get avatar from gravatar
const getAvatar = computed(() => {
  const encodeEmail = md5(props.email)
  return `http://gravatar.com/avatar/${encodeEmail}?s=${props.size}`
})
</script>

<template>
  <v-avatar :size="props.size"><v-img alt="Avatar" :src="getAvatar"></v-img></v-avatar>
</template>

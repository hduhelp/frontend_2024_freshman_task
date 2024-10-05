<script setup>
import { useUserStore } from '@/stores/userStore'
import { ref, computed } from 'vue'
import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const userStore = useUserStore()
const userData = computed(() => userStore.userData)
const props = defineProps({
  id: Number
})

const answerContent = ref({
  content: '',
  created_at: '',
  author_email: '',
  author_name: '',
  question_id: ''
})

const submitAnswer = async () => {
  try {
    answerContent.value.author = userData.value.username
    answerContent.value.author_email = userData.value.email
    answerContent.value.created_at = new Date().toISOString()

    const response = await axios.post(
      `${API_BASE_URL}/api/question/${props.id}/answer`,
      answerContent.value
    )
    console.log('Answer submitted:', response.data)
    alert(`Submit Complete! Answer ID = ${response.data.id}`)
    // reset content
    answerContent.value = {
      content: '',
      created_at: '',
      author_email: '',
      author_name: '',
      question_id: ''
    }
  } catch (error) {
    alert('Sry! Error occur. Please try again.')
    console.error('Error submitting question:', error)
  }
}
</script>

<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            disabled
            v-model="userData.username"
            label="UserName"
            hide-details
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field
            disabled
            v-model="userData.email"
            label="E-mail"
            hide-details
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
  <v-container fluid>
    <v-textarea v-model="answerContent.content" label="Content" counter auto-grow></v-textarea>
    <div class="pa-4 text-end">
      <v-btn prepend-icon="mdi-upload" color="deep-grey" variant="outlined" @click="submitAnswer"
        >Submit Answer</v-btn
      >
    </div>
  </v-container>
</template>

<script setup>
import { useUserStore } from '@/stores/userStore'
import { ref, computed } from 'vue'
import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const userStore = useUserStore()
const userData = computed(() => userStore.userData)

const questionContent = ref({
  title: '',
  detail: '',
  author: '',
  created_at: '',
  author_email: '',
  answers: []
})

const submitQuestion = async () => {
  try {
    questionContent.value.author = userData.value.username
    questionContent.value.author_email = userData.value.email
    questionContent.value.created_at = new Date().toISOString()

    const response = await axios.post(`${API_BASE_URL}/question`, questionContent.value)
    alert(`Submit Complete! Question ID = ${response.data.id}`)
    // reset content
    questionContent.value = {
      title: '',
      detail: '',
      author: '',
      created_at: '',
      author_email: '',
      answers: []
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
            :label="$t('username')"
            hide-details
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field
            disabled
            v-model="userData.email"
            :label="$t('email')"
            hide-details
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field v-model="questionContent.title" :label="$t('title')" hide-details></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
  <v-container fluid>
    <v-textarea v-model="questionContent.detail" :label="$t('content')" counter auto-grow></v-textarea>
    <div class="pa-4 text-end">
      <v-btn prepend-icon="mdi-upload" color="deep-grey" variant="outlined" @click="submitQuestion"
        >{{ $t("askQuestion") }}</v-btn
      >
    </div>
  </v-container>
</template>

<script setup>
import { useUserStore } from '@/stores/userStore'
import { ref, computed } from 'vue'
import axios from 'axios';

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

    const response = await axios.post(
      'https://hduhelp.woshiluo.com/api/question',
      questionContent.value
    )
    console.log('Question submitted:', response.data)
    alert('Submit Complete!')
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
      <v-row>
        <v-col>
          <v-text-field v-model="questionContent.title" label="Title" hide-details></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
  <v-container fluid>
    <v-textarea v-model="questionContent.detail" label="Content" counter auto-grow></v-textarea>
    <div class="pa-4 text-end">
      <v-btn prepend-icon="mdi-upload" color="deep-grey" variant="outlined" @click="submitQuestion"
        >Submit</v-btn
      >
    </div>
  </v-container>
</template>

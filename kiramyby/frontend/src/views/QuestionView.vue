<script setup>
import AnswerCard from '@/components/AnswerCard.vue'
import { computed, onMounted, ref } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import QuestionCard from '@/components/QuestionCard.vue'
import AvatarGetter from '@/components/AvatarGetter.vue'
import ProfileEditor from '@/components/ProfileEditor.vue'
import AnswerEditor from '@/components/AnswerEditor.vue'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
const route = useRoute()
const userStore = useUserStore()

const userData = computed(() => userStore.userData)
const errorMessage = ref('')
const question = ref({
  id: Number(),
  title: '',
  detail: '',
  author: '',
  created_at: '',
  author_email: '',
  answers: []
})

const answers = computed(() => (question.value || []).answers)

const fetchQuestionData = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/question/${id}`)
    question.value = response.data
  } catch (error) {
    console.error('Error fetching question:', error)
    errorMessage.value = 'Failed to load questions. Please try again later.'
  }
}

onMounted(() => {
  question.value.id = Number(route.params.id)
  fetchQuestionData(question.value.id)
})
</script>

<template>
  <v-container>
    <v-row>
      <v-col>
        <!-- Where Component Insert-->
         <v-card variant="outlined" :title="$t('question')"></v-card>
        <QuestionCard
          :id="question.id"
          :question="question.title"
          :detail="question.detail"
          :time="question.created_at"
          :author="question.author"
          :author_email="question.author_email"
          :unsolved="answers.length === 0"
          standard
        >
        </QuestionCard>
        <v-divider></v-divider>
        <v-card variant="outlined" :title="$t('answer')"></v-card>
        <AnswerCard
          v-for="answer in answers"
          :key="answer.id"
          :id="answer.id"
          :time="answer.created_at"
          :author="answer.author_name"
          :email="answer.author_email"
          :content="answer.content"
        ></AnswerCard>

        <v-divider></v-divider>
        <v-container fluid>
          <v-card>
            <v-card-text>
              <v-sheet class="d-flex align-center justify-center">
                <v-row>
                  <v-col>
                    <div class="text-center">
                      <AvatarGetter :email="userData.email" size="48" />
                    </div>
                    <div class="text-center">{{ userData.username }}</div>
                    <div class="text-center">{{ userData.email }}</div>
                    <div class="text-center">
                      <ProfileEditor />
                    </div>
                  </v-col>
                </v-row>
              </v-sheet>
              <AnswerEditor :id="question.id" />
            </v-card-text>
            <template v-slot:prepend> </template>
          </v-card>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import ProfileEditor from '@/components/ProfileEditor.vue'
import QuestionCard from '@/components/QuestionCard.vue'
import axios from 'axios'
import { useUserStore } from '@/stores/userStore'
import { ref, computed, onMounted } from 'vue'
import AvatarGetter from '@/components/AvatarGetter.vue'

const questions = ref([
  {
    id: Number(),
    title: '',
    detail: '',
    author: '',
    created_at: '',
    author_email: '',
    answers: []
  }
])
const currentPage = ref(1)
const itemsPerPage = 10

const userStore = useUserStore()
const userData = computed(() => userStore.userData)

const fetchQuestions = async () => {
  try {
    const response = await axios.get('https://hduhelp.woshiluo.com/api/question')
    questions.value = response.data
  } catch (error) {
    console.error('Error fetching questions:', error)
  }
}

// calc total pages
const totalPages = computed(() => {
  return Math.ceil(questions.value.length / itemsPerPage)
})

// questions in current page
const currentQuestions = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  return questions.value.slice(startIndex, endIndex)
})

onMounted(() => {
  fetchQuestions()
})
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="3">
        <v-sheet id="sidebar" rounded="lg">
          <div class="pa-4 text-center">
            <v-sheet class="d-flex align-center justify-center" height="167px" fluid>
              <v-row>
                <v-col>
                  <!-- Where Components Insert -->
                  <AvatarGetter :email="userData.email" size="64" />
                  <v-sheet class="text"> {{ userData.username }} </v-sheet>
                  <v-sheet class="text"> {{ userData.email }} </v-sheet>
                  <ProfileEditor />
                </v-col>
              </v-row>
            </v-sheet>
          </div>
        </v-sheet>
      </v-col>

      <v-col cols="12" md="9">
        <v-sheet rounded="lg">
          <!-- Where Components Insert -->
          <QuestionCard
            v-for="question in currentQuestions"
            :key="question.id"
            :id="question.id"
            :question="question.title"
            :author="question.author"
            :author_email="question.author_email"
            :detail="question.detail"
            :time="question.created_at"
            :unsolved="(question.answers || []).length === 0"
          ></QuestionCard>
          <div>
            <div class="text-center">
              <v-pagination v-model="currentPage" :length="totalPages" :total-visible="5">
              </v-pagination>
            </div>
          </div>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped></style>

<template>
  <div>
    <h1>Question List</h1>
    <AddQuestion @add-question="addQuestion" />
    <QuestionList 
      :questions="questions"
      @edit-question="editQuestion"
      @delete-question="deleteQuestion"
      @add-answer="addAnswer"
    />
  </div>
</template>

<script>
import AddQuestion from './components/AddQuestion.vue';
import QuestionList from './components/QuestionList.vue';
import { v4 as uuidv4 } from 'uuid'; // 使用 uuid 库生成唯一ID

export default {
  components: {
    AddQuestion,
    QuestionList
  },
  data() {
    return {
      questions: [
        { id: uuidv4(), text: 'What is Vue.js?' },
        { id: uuidv4(), text: 'How to create a Vue project?' },
        { id: uuidv4(), text: 'What is a component in Vue?' }
      ]
    };
  },
  methods: {
    addQuestion(newQuestion) {
      this.questions.push({ id: uuidv4(), text: newQuestion });
    },
    editQuestion(id) {
      const question = this.questions.find(q => q.id === id);
      if (question) {
        const newQuestion = prompt('Edit your question:', question.text);
        if (newQuestion !== null && newQuestion.trim() !== '') {
          question.text = newQuestion;
        }
      }
    },
    deleteQuestion(id) {
      this.questions = this.questions.filter(q => q.id !== id);
    },
    addAnswer(id) {
      const question = this.questions.find(q => q.id === id);
      if (question) {
        const answer = prompt('Add an answer for this question:');
        if (answer) {
          alert(`Answer added to "${question.text}": ${answer}`);
        }
      }
    }
  }
};
</script>

<style scoped>
/* 样式部分保持不变 */
</style>

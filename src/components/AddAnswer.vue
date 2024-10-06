<template>
    <div v-if="showAnswerForm">
      <input v-model="answer" placeholder="Add an answer" />
      <button @click="submitAnswer">Submit</button>
      <button @click="cancelAnswer">Cancel</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        showAnswerForm: false,
        answer: ''
      };
    },
    methods: {
      startAnswering() {
        this.showAnswerForm = true;
      },
      submitAnswer() {
        if (this.answer.trim()) {
          this.$emit('submit-answer', this.answer);
          this.answer = '';
          this.showAnswerForm = false;
        }
      },
      cancelAnswer() {
        this.showAnswerForm = false;
      }
    }
  };
  </script>
  
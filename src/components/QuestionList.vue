<template>
    <ul>
      <li v-for="(question) in questions" :key="question.id" class="question-item">
        <span>{{ question?.text || 'No question available' }}</span>
        <button @click="editQuestion(question?.id)" class="edit-btn">Edit</button>
        <button @click="deleteQuestion(question?.id)" class="delete-btn">Delete</button>
        <button @click="addAnswer(question?.id)" class="answer-btn">Add Answer</button>
      </li>
    </ul>
  </template>
  
  <script>
  export default {
    props: ['questions'],
    methods: {
      editQuestion(id) {
        if (id) {
          this.$emit('edit-question', id);
        }
      },
      deleteQuestion(id) {
        if (id) {
          this.$emit('delete-question', id);
        }
      },
      addAnswer(id) {
        if (id) {
          this.$emit('add-answer', id);
        }
      }
    }
  };
  </script>
  
<style scoped>
.question-item {
  margin: 10px 0;
  display: flex;
  align-items: center;
}

.question-item span {
  flex: 1;
}

.edit-btn,
.delete-btn,
.answer-btn {
  margin-left: 10px;
  padding: 5px 10px;
  background-color: #f44336;
  color: white;
  border: none;
  cursor: pointer;
}

.edit-btn {
  background-color: #4caf50;
}

.answer-btn {
  background-color: #2196f3;
}
</style>  
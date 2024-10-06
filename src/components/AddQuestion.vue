<template>
  <div>
    <input v-model="newQuestion" placeholder="What is your question?" />
    <button @click="addQuestion" class="add-btn">Add</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newQuestion: ''
    };
  },
  methods: {
    addQuestion() {
      if (this.newQuestion.trim()) {
        this.$emit('add-question', this.newQuestion);
        this.newQuestion = '';
      }
    }
  }
};
</script>

<style scoped>
.add-btn {
  padding: 10px 20px;
  background-color: black;
  color: white;
  border: none;
  cursor: pointer;
}
</style>

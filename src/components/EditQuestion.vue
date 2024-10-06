<template>
  <div v-if="editing">
    <input v-model="questionText" placeholder="Edit your question" />
    <button @click="saveQuestion">Save</button>
    <button @click="cancelEdit">Cancel</button>
  </div>
</template>

<script>
export default {
  props: ['question'],
  data() {
    return {
      editing: false,
      questionText: this.question.text
    };
  },
  methods: {
    startEditing() {
      this.editing = true;
    },
    saveQuestion() {
      if (this.questionText.trim()) {
        this.$emit('save-question', this.questionText);
        this.editing = false;
      }
    },
    cancelEdit() {
      this.editing = false;
    }
  }
};
</script>

<template>
    <div>
        <div v-for="question in nonEmptyQuestions" :key="question.id" class="question">
        <h2>{{ question.title }}</h2>
        <p>{{ question.detail }}</p>
        <p>作者：{{ question.author }}</p>
        <p>邮箱：{{ question.author_email }}</p>
        <p>创建时间：{{ question.created_at }}</p>
        <div class="answers">
        <h3>答案：</h3>
        <div v-for="answer in question.answers" :key="answer.id" class="answer">
          <p>{{ answer.content }}</p>
        </div>
        </div>
        <button @click="likeQuestion(question)">点赞</button>
      <p>点赞数：{{ question.likes }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        questions: []
      };
    },
    created() {
      this.fetchQuestions();
    },
    methods: {
      fetchQuestions() {
      fetch('https://hduhelp.woshiluo.com/api/question')
        .then(response => response.json())
        .then(data => {
          this.questions = data.map(question => ({
            ...question,
            likes: 0
          }));
        })
        .catch(error => console.error('Error:', error));
    },
    likeQuestion(question) {
      question.likes += 1;
    }
  },
    computed: {
    nonEmptyQuestions() {
      return this.questions.filter(question => question.id && question.title);
    }
  }
  };
  </script>
  
  <style scoped>
  .question {
    border: 1px solid #ccc;
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 4px;
  }
  
  h2 {
    color: #333;
  }
  
  p {
    color: #666;
  }
  .question {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 800px; /* 限制最大宽度 */
}

.question h2 {
  margin-top: 0;
  color: #333;
}

.question p {
  color: #666;
  font-size: 16px;
}

.question .answers {
  background-color: #e9ecef;
  border-left: 4px solid #007bff;
  padding: 15px;
  margin-top: 20px;
  border-radius: 4px;
}

.question .answers h3 {
  margin-top: 0;
  color: #333;
}

.question .answer {
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
}

.question .answer p {
  color: #333;
  font-size: 14px;
}

.question button {
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  background-color: #28a745;
  color: white;
  cursor: pointer;
  outline: none;
  font-size: 16px;
  margin-top: 10px;
}

.question button:hover {
  background-color: #218838;
}

.question p:last-child {
  margin-bottom: 0;
}
  </style>
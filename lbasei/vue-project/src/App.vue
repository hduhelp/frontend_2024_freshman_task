<script>
</script>
<template>
<progress-bar v-if="isLoading" :visible="isLoading" :progress="progress"></progress-bar>
<div class="mbody">
   <div class="inputbutton">
   <input type="text" placeholder="输入你感兴趣的东西">
   <button>搜索</button>
</div>
<div class="content-area">
  <div class="options-button">
    <button class="button" @click="createQuestion">添加问题</button>
    <button class="button" @click="editQuestion">修改问题</button>
    <button class="button" @click="createAnswer">写回答</button>
  </div>
  <div class="tbody">
     <div v-if="isLoaded">
      <question-list v-if="!isEditing && !isCreating && !isAnswering"></question-list>
      <div v-if="isEditing" class="edit-question">
          <input type="text" placeholder="输入问题ID" v-model="editQuestionId">
          <button @click="fetchQuestionById">确认ID</button>
          <button @click="cancelEdit">取消</button>
          <div v-if="isQuestionFetched">
          <input type="text" placeholder="输入问题标题" v-model="editingQuestion.title" :disabled="!isEditing">
          <textarea placeholder="输入问题详情" v-model="editingQuestion.detail" :disabled="!isEditing"></textarea>
          <button @click="saveEdit">保存修改</button>
          <button @click="cancelEdit">取消</button>
          </div>
        </div>
        <div v-else-if="isCreating" class="create-question">
          <input type="text" placeholder="输入问题标题" v-model="newQuestion.title">
          <textarea placeholder="输入问题详情" v-model="newQuestion.detail"></textarea>
          <input type="text" placeholder="输入作者" v-model="newQuestion.author">
          <input type="email" placeholder="输入作者邮箱" v-model="newQuestion.author_email">
          <button @click="saveQuestion">保存问题</button>
          <button @click="cancelCreate">取消</button>
        </div>
        <div v-if="isAnswering" class="answer-question">
            <input type="text" placeholder="输入问题ID" v-model="answerQuestionId">
            <button @click="fetchQuestionById">确认ID</button>
            <button @click="cancelAnswer">取消</button>
            <div v-if="isQuestionFetched">
              <div>{{ editingQuestion.content }}</div>
              <input type="text" placeholder="输入答案" v-model="newAnswer.content">
              <button @click="saveAnswer">保存答案</button>
              <button @click="cancelAnswer">取消</button>
            </div>
        </div>

     </div>
  </div>
</div>
</div>
</template>
<script>
import ProgressBar from '@/components/icons/ProgressBar.vue';
import QuestionList from '@/components/icons/QuestionList.vue';

export default {
  components: {
    ProgressBar,
    QuestionList
  },
  data() {
    return {
      isLoading: true,
      progress: 0,
      isLoaded:false,
      isEditing: false,
      isCreating: false,
      isAnswering: false,
      isQuestionFetched: false,
      newQuestion: {
        id: '',
        title: '',
        detail: '',
        author: '',
        created_at: '',
        author_email: '',
        answers: []
      },
      questions: [],
      editingQuestion: {},
      editQuestionId: '',
      answerQuestionId: '',
      newAnswer: {
      id: '',
      content: '',
      author_email: '',
      author_name: '',
      is_best: false,
      question_id: null 
    }
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      setTimeout(() => {
        this.isLoading = false;
        this.isLoaded=true;
      }, 3000);
    },
    incrementProgress() {
    if (this.progress < 100) {
      this.progress += 10;
      setTimeout(this.incrementProgress, 100);
    } else {
      this.isLoading = false; 
      this.progress = 0;      
    }
  },
    createQuestion() {
      this.isCreating = true;
      this.isAnswering=false;
      this.isEditing=false;
      this.newQuestion = { 
        id: '',
        title: '',
        detail: '',
        author: '',
        created_at: '',
        author_email: '',
        answers: []
      };
      this.editingQuestion = {
        id: '',
        title: '',
        detail: '',
        author: '',
        created_at: '',
        author_email: '',
        answers: []
      };
      
    },
    editQuestion() {
      this.isEditing = true;
      this.editQuestionId = '';
      this.isQuestionFetched = false;
      this.isAnswering=false;
    },
    fetchQuestionById() {
      if (this.editQuestionId) {
        fetch(`https://hduhelp.woshiluo.com/api/question/${this.editQuestionId}`) 
          .then(response => response.json())
          .then(data => {
            this.editingQuestion = { ...data };
            this.editQuestionId = ''; 
            this.isQuestionFetched = true;
          })
          .catch(error => {
            console.error('Error:', error);
          });
      } else if (this.answerQuestionId) {
    fetch(`https://hduhelp.woshiluo.com/api/question/${this.answerQuestionId}`)
      .then(response => response.json())
      .then(data => {
        this.editingQuestion = { ...data };
        this.isQuestionFetched = true;
        this.storeQuestionDetails(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
},
storeQuestionDetails(questionData) {
  const { id, content, author_email, author_name, question_id, is_best, created_at } = questionData;
  this.newAnswer = {
    id: id,
    content: content,
    created_at: created_at, 
    author_email: author_email,
    author_name: author_name,
    question_id: Number(question_id), 
    is_best: is_best,
  };
},
    saveEdit() {
      fetch(`https://hduhelp.woshiluo.com/api/question/${this.editingQuestion.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.editingQuestion),
      })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Network response was not ok.');
        }
      })
      .then(data => {
        console.log('Question updated:', data);
        this.isEditing = false;
        this.fetchData();
      })
      .catch(error => {
        console.error('Error:', error);
      });
    },
    cancelEdit() {
      this.isEditing = false;
      this.isCreating=false;
      this.editQuestionId = '';
      this.editingQuestion = {};
      this.resetProgress();
    },
    createAnswer() {
    this.isAnswering = true;
    this.isCreating=false;
    this.isEditing=false;
    this.answerQuestionId = '';
    this.newAnswer = {
      id: '',
      content: '',
      author_email: '',
      author_name: '',
      is_best: false,
      question_id: null
    };
  },
  saveAnswer() {
  if (!this.answerQuestionId) {
    console.error('No question ID provided for the answer.');
    return;
  }//防止object输出
  let questionId;
  if (typeof this.answerQuestionId === 'string') {
    questionId = parseInt(this.answerQuestionId, 10);
  } else if (typeof this.answerQuestionId === 'number') {
    questionId = this.answerQuestionId;
  } else {
    console.error('Invalid question ID type:', this.answerQuestionId);
    return;
  }
  this.newAnswer.question_id = questionId;
  console.log('Sending the following answer to the server:', this.newAnswer);//测试用

  fetch(`https://hduhelp.woshiluo.com/api/question/${questionId}/answer`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(this.newAnswer),
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Network response was not ok.');
    }
  })
  .then(data => {
    console.log('Answer saved:', data);
    this.isAnswering = false;
    this.fetchData(); // 重新获取问题列表
  })
  .catch(error => {
    console.error('Error:', error);
  });
},
    cancelAnswer() {
    this.isAnswering = false;
    this.answerQuestionId = '';
    this.newAnswer = {
      id: '',
      content: '',
      author_email: '',
      author_name: '',
      is_best: false,
      question_id: null
    };
    this.resetProgress();
  },
    saveQuestion() {
  const maxId = Math.max(...this.questions.map(q => q.id));
  this.newQuestion.id = maxId + 1;
  this.newQuestion.created_at = this.gettime();
  fetch('https://hduhelp.woshiluo.com/api/question', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(this.newQuestion),
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Network response was not ok.');
    }
  })
  .then(data => {
    console.log('Question saved:', data);
    this.isCreating = false;
    this.fetchData(); // 再一次获取问题列表
  })
  .catch(error => {
    console.error('Error:', error);
  });
},
    cancelCreate() {
      this.isCreating = false;
      this.isEditing=false;
      this.resetProgress();
    },
    gettime() {
      const now = new Date();
      return now.toISOString(); // 获取当前时间
    }
  },

  mounted() {
    this.incrementProgress();
  }
};
</script>

<style scoped>
.mbody {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100vh;
  margin: 0;
  padding-top: 10px; 
  background: linear-gradient(to bottom, #B3E1FF, #d2ddeb);
  background-size: cover;
}

.inputbutton {
  display: flex;
  justify-content: center;
  align-items: center; 
  width: 100%; 
  padding-top: 20px; 
}

.inputbutton input {
  padding: 15px;
  border: 2px solid #ccc;
  border-radius: 4px 0 0 4px;
  border-right: none;
  width: 20vw;
}

.inputbutton button {
  border-radius: 0 4px 4px 0;
  border-left: none;
  padding: 14px 20px;
  border: 2px solid #ccc;
  background-color: #add8e6;
  color: black;
  margin-left: -2px;
}

.tbody {
  border: 2px solid black;
  overflow-y: auto;
  border-radius: 4px;
  box-sizing: border-box;
  padding: 20px;
  height: 70vh;
  width: 70vw; 
  background: white;
}
.content-area {
  display: flex;
  flex-direction: column;
  align-items: flex-start; 
  width: 70vw;
}
.options-button {
  margin-top: 50px; 
}
.button {
  padding: 10px 20px; 
  border: 1px solid #ccc; 
  background-color: #f0f0f0; 
  color: black; 
  border-radius: 4px; 
  margin-right: -1px; 
  cursor: pointer; 
  outline: none; 
  background-color: white;
}
.button:last-child {
  margin-right: 0;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
.button:first-child {
  margin-left: 0;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
.button:nth-child(2) {
  border-radius: 0;
}
.create-question input, .create-question textarea {
  display: block;
  margin-bottom: 10px;
  width: 100%;
}
.edit-question input, .edit-question textarea {
  display: block;
  margin-bottom: 10px;
  width: 100%;
}
@media (max-width: 600px) {
  .inputbutton input {
    width: 80vw; 
  }

  .tbody {
    width: 90vw; 
    height: 80vh; 
  }

  .content-area {
    width: 90vw; 
  }
}
@media (min-width: 601px) and (max-width: 1024px) {
  .inputbutton input {
    width: 50vw; 
  }

  .tbody {
    width: 80vw; 
    height: 70vh; 
  }

  .content-area {
    width: 80vw; 
  }
}

@media (min-width: 1025px) {
  .inputbutton input {
    width: 30vw; 
  }

  .tbody {
    width: 70vw; 
    height: 70vh; 
  }

  .content-area {
    width: 70vw; 
  }
}
.edit-question {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 20px;
  box-sizing: border-box; 
}

.edit-question input[type="text"],
.edit-question textarea {
  width: 100%;
  max-width: 600px; 
  padding: 10px;
  margin-top: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box; 
}

.edit-question textarea {
  resize: vertical; 
  min-height: 100px;
}

.edit-question button {
  padding: 8px 12px; 
  margin-top: 10px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  outline: none;
  font-size: 14px; 
  margin-right: 10px; 
}

.edit-question button:hover {
  background-color: #0056b3;
}

.edit-question button:disabled {
  background-color: #cccccc;
}

.edit-question .button-group {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

.edit-question .button-group button {
  margin-left: 10px;
}
.create-question {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
}

.create-question input[type="text"],
.create-question textarea,
.create-question input[type="email"] {
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box; 
}

.create-question textarea {
  resize: vertical; 
  min-height: 100px;
}

.create-question button {
  padding: 8px 12px; 
  margin-top: 10px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  outline: none;
  font-size: 14px; 
}

.create-question button:hover {
  background-color: #0056b3;
}

.create-question button:disabled {
  background-color: #cccccc;
}

.create-question .button-group {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

.create-question .button-group button {
  margin-left: 10px;
}
.answer-question {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
}

.answer-question input[type="text"],
.answer-question div,
.answer-question textarea {
  width: 100%;
  max-width: 600px;
  padding: 10px;
  margin-top: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.answer-question div {
  background-color: #f8f9fa;
  border: 1px solid #e9ecef;
  padding: 15px;
  margin-top: 0;
  white-space: pre-wrap; 
  word-wrap: break-word; 
}

.answer-question button {
  padding: 8px 12px;
  margin-top: 10px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  outline: none;
  font-size: 14px; 
  margin-right: 10px; 
}
.answer-question button:hover {
  background-color: #0056b3;
}

.answer-question button:disabled {
  background-color: white;
}

.answer-question .button-group {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

.answer-question .button-group button {
  margin-left: 10px;
}
</style>
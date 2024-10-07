<template>
    <div class="progress-bar" v-if="visible">
      <div class="progress" :style="{ width: progress + '%' }"></div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      visible: {
        type: Boolean,
        default: false
      },
      progress: {
        type: Number,
        default: 0
      }
    }
  };
  </script>
  
  <style scoped>
  .progress-bar {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    max-width: 600px;
    height: 20px;
    background-color: #f0f0f0;
    border-radius: 10px;
    overflow: hidden;
  }
  
  .progress {
    height: 100%;
    background-color: #409eff;
    transition: width 0.3s ease;
  }
  </style>
<template>
    <div>
      <h1>{{ message }}</h1>
      <router-link to="/quizz" class="try-again-button">Try again</router-link>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  
  export default defineComponent({
    name: 'Oops',
    setup() {
      const message = ref('oops');
  
      return {
        message
      };
    }
  });
  </script>
  
  <style scoped>
  h1 {
    color: red;
  }
  
  .try-again-button {
    background-color: blue;
    color: white;
    padding: 10px 20px;
    text-decoration: none;
    display: inline-block;
  }
  </style>
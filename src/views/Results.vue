<template>

  </template>
  
  <script lang="ts">
  import axios from 'axios';
  
  export default {
    data() {
      return {
        results: null,
      };
    },
    async created() {
  try {
    const response = await axios.get('https://backend-quiz-dot-tools-303211.nw.r.appspot.com/quiz/score');
    this.results = response.data;
    console.log(this.results);
  } catch (error) {
    console.error(error);
  }
},
  };
  </script>
  
  <style scoped>
  </style>
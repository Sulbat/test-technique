<template>
    <div>
      <div v-if="isLoading">Loading...</div>
      <div v-else>
        <div>{{ question }}</div>
        <input type="text" v-model="answer" />
        <button @click="postAnswer">Valider</button>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, onMounted } from "vue";
  import axios from "axios";
  
  const question = ref("");
  const answer = ref("");
  const token = localStorage.getItem('jwt');
  const isLoading = ref(true);


  const axiosQuestion = async () => {
    try {
      const response = await axios.get("https://backend-quiz-dot-tools-303211.nw.r.appspot.com/quiz", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
  question.value = response.data.label;
  console.log(response.data); // Affiche toutes les données renvoyées par l'API
} else {
  console.log("GET request failed with status: ", response.status);
}
    } catch (error) {
      console.error("An error occurred during GET request: ", error);
    } finally {
      isLoading.value = false;
    }
  };
  
  const postAnswer = async () => {
    try {
      const response = await axios.post(
        "https://backend-quiz-dot-tools-303211.nw.r.appspot.com/quiz",
        { answer: answer.value },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("An error occurred during POST request: ", error);
    }
  };
  
  onMounted(axiosQuestion);
  </script>


<template>
    <div>
      <button @click="fetchData">Effectuer la requête</button>
    </div>
  </template>
  
  <script lang="ts">
  import axios from 'axios';
  
  export default {
    methods: {
      fetchData() {
        const walletAddress = '0x73F7368f274D5385700654690b3c02FA4979d878';
  
        // URL de l'API
        const apiUrl = 'https://backend-quiz-dot-tools-303211.nw.r.appspot.com/auth/message';
  
        // Utilisation de axios pour effectuer la requête GET avec l'adresse de portefeuille dynamique
        axios.get(`${apiUrl}/${walletAddress}`, {
          headers: {
            'accept': 'application/json',
          },
        })
        .then(response => {
          const message = response.data.message;
        })
        .catch(error => {
          // Gestion erreur
          console.error(error);
        });
      },
    },
  };
  </script>
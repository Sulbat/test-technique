<template>
  <router-view/>
  <!-- <Login />
  <Quizz /> -->
</template>

<script lang="ts">
import Login from './views/Login.vue';
import Quizz from './views/Quizz.vue';
import Results from './views/Results.vue'; 
import Oops from './views/Oops.vue';

export default {
  components: {
    Login,
    Quizz,
    Results,
    Oops
  }
}
</script>
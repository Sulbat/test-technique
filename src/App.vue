<template>
  <router-view/>
  <!-- <Login />
  <Quizz /> -->
</template>

<script lang="ts">
import Login from './views/Login.vue';
import Quizz from './views/Quizz.vue';

export default {
  components: {
    Login,
    Quizz
  }
}
</script>
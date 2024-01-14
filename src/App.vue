<template>
  <Login />
  <Quizz />
</template>

<script lang="ts">
import Login from './components/Login.vue';
import Quizz from './components/Quizz.vue';

export default {
  components: {
    Login,
    Quizz
  }
}
</script>
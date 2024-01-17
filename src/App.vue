<template>
  <Header />
  <div id="app">
    
  <router-view/>
  </div>
  <!-- <Login />
  <Quizz /> -->
</template>

<script lang="ts">
import Login from './views/Login.vue';
import Quizz from './views/Quizz.vue';
import Results from './views/Results.vue'; 
import Oops from './views/Oops.vue';
import Header from './components/Header.vue';
import test from './views/test.vue';


export default {
  components: {
    Login,
    Quizz,
    Results,
    Oops,
    Header,
    test
  }
}
</script>
<template>
  <Authentication />
  <Login />
</template>

<script lang="ts">
import Authentication from './components/Authentification.vue';
import Login from './components/Login.vue';

export default {
  components: {
    Authentication,
    Login
  }
}
</script>
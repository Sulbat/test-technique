<template>
  <header class="header">
    <sun />
    <warning />
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Sun from '../components/Sun.vue';
import Warning from '../components/Warning.vue';


export default defineComponent({
  name: "Header",
  components: {
    Sun,
    Warning
  }
});
</script>

<style scoped>
.header {
  @apply h-[28px] flex-shrink-0 bg-black;
}
</style>

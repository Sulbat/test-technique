<template>
  <header class="header h-8 bg-black">
    <sun />
    <warning />
    <!-- <div
      class="fixed top-0 right-0 text-customGreen p-4 font-inter text-xs font-normal leading-normal"
    >
      {{ address }}
    </div> -->
  </header>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import Sun from '../components/Sun.vue';
import Warning from '../components/Warning.vue';


export default defineComponent({
  name: "Header",
  components: {
    Sun,
    Warning
  },
  // setup() {
  //   const address = ref('');

  //   onMounted(() => {
  //     address.value = localStorage.getItem('address') || '';
  //   });

  //   return { address };
  // }
});



</script>

<style scoped>
/* .header {
  @apply h-[28px] flex-shrink-0 bg-black;
} */
</style>

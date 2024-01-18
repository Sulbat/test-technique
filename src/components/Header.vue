<template>
  
  <header class="header h-8 bg-black">
    <sun />
    <warning v-if="!address"/>
    <div
      class="fixed top-0 right-0 text-customGreen p-4 font-inter text-xs font-normal leading-normal"
    >
      Conncected to Goerli {{ address }}
    </div>
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
  setup() {
    const address = ref('');

    onMounted(() => {
      address.value = localStorage.getItem('shortenedAddress') || '';
    });

    return { address };
  }
});



</script>



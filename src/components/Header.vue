<template>
  
  <header class="header h-8 bg-black">
    <sun />
    <warning v-if="!address"/>
    <div
          v-if="address"
        >
        <span class= "fixed top-0 right-20 text-customGreen p-4 font-inter text-xs font-normal leading-normal">Connected to Goerli </span>
        </div>
    <div
      class="fixed top-0 right-0 text-customGreen p-4 font-inter text-xs font-normal leading-normal"
    >
       {{ address }}
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
    const address = ref<string | null>(null); // Spécifie explicitement le type de la référence

    // Simule une mise à jour de l'adresse après 2 secondes
    setTimeout(() => {
      address.value = '0x123...'; // Met à jour la valeur de la référence
    }, 2000);

    return {
      address
    };
  }
});
</script>



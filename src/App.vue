<template>
  <div class="grid place-items-center h-96">
      <div v-if="!isLoggedIn">
          <button
          @click="connectWallet"
          v-if="isMetamaskSupported"
          class="px-4 py-2 rounded bg-gradient-to-r from-blue-500 to-blue-600 text-gray-50 font-semibold"
          >
          Metamask Login
          </button>
          <Title v-else>Please Install Metamask Extension</Title>

      </div>

      <div v-else>
          {{computedAdress}}
      </div>
  </div>

</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";

const isLoggedIn = ref(false);
const adress = ref("");
const isMetamaskSupported = ref(false);

onMounted(() => {
  isMetamaskSupported.value = typeof (window as any).ethereum !== "undefined";
});

async function connectWallet() {
  try {
    const accounts = await (window as any).ethereum.request({ method: "eth_requestAccounts" });
    adress.value = accounts[0];
    isLoggedIn.value = true;
  } catch (error) {
    console.error("Erreur lors de la connexion au portefeuille : ", error);
  }
}

const computedAdress = computed(() => adress.value ? adress.value.substring(0, 4) + "...." : '');
</script>
<template>
  <div class="grid place-items-center h-96">
      <div v-if="!isLoggedIn">
          <button
          @click="connectWallet"
          v-if="isMetamaskInstalled"
          class="px-4 py-2 rounded bg-gradient-to-r from-blue-500 to-blue-600 text-gray-50 font-semibold"
          >
          Metamask Login
          </button>
          <div v-else class="text-center text-black bg-red-500 p-4 rounded-md shadow-lg max-w-md mx-auto mt-4 font-bold">
            Please Install Metamask Extension
          </div>

      </div>

      <div v-else>
          {{address}}
      </div>
  </div>

</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";

const isLoggedIn = ref(false);
const address = ref("");
const isMetamaskInstalled = ref(false);

onMounted(async () => {
  isMetamaskInstalled.value = typeof window.ethereum !== 'undefined';
});

const connectWallet = async () => {
  if (isMetamaskInstalled.value) {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      address.value = accounts[0];
      isLoggedIn.value = true;
    } catch (err) {
      console.error("Failed to connect to Metamask", err);
    }
  }
};
</script>
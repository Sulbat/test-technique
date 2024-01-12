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
import { computed } from "vue";
import { onMounted, ref, defineAsyncComponent } from "@vue/runtime-core";

const isLoggedIn = ref(false);
const adress = ref("")
const isMetamaskSupported = ref(false);
onMounted(() => {
  isMetamaskSupported.value = typeof (window as any).ethereum !== "undefined";
});

async function connectWallet() {
  const accounts = await (window as any).ethereum.request({ method: "eth_requestAccounts" });
    adress.value = accounts[0];  
}

const computedAdress = computed(() => adress.value.substring(0, 4) + "....");
</script>
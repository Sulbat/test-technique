<template>
    <div class="bg-[url('https://s3-alpha-sig.figma.com/img/bd1e/de1f/46ce6382d97700f160b0b0012ceda654?Expires=1706486400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ZUEOhLba-rdag94TL5FESnVzyYRtdFNX9BqlsIrEtRyBDeoCL~B-IxYpi0M99Hk2VqbSbtJokzOsR5LbC7svwzD4K0XW-LwAhCJO0RRK2s7TuUyoARuihosZpwOu9KUOG-31iIVW03DB2pBNKI4nEXkckepVZXNUJWyYXodFGx3wPjedVrhMJJOuaqfv7zrvv8D9wzduppoK7SdZJ0wwEybY5fRXGPBwVVKeoC1GRTtcqu4JOSNUCM3~OiHtyVOPN2qRQOuhtjQ0H9hg7gvl-mo-EfShkmHDlVb4wZxL0dX~5pqn7KwYmNMmFQB32Z7lKzLBrL2XShEPBJZMxr5j2w__')] bg-cover bg-no-repeat h-screen flex items-center justify-center">
    <div v-if="!isLoggedIn">
      <button
        @click="connectWallet"
        v-if="isMetamaskInstalled"
        class="px-4 py-2 rounded bg-gradient-to-r from-blue-500 to-blue-600 text-gray-50 font-semibold"
      >
        Connect Wallet
      </button>
      <div
        v-else
        class="text-center text-black bg-red-500 p-4 rounded-md shadow-lg max-w-md mx-auto mt-4 font-bold"
      >
        Please Install Metamask Extension
      </div>
    </div>


    <div v-if="isLoggedIn">
    <button
      @click="startQuiz"
      class="px-4 py-2 rounded bg-gradient-to-r from-blue-500 to-blue-600 text-gray-50 font-semibold"
    >
      Démarrer
    </button>
    <div v-if="isLoggedIn" class="fixed top-0 right-0 text-customGreen p-4 font-inter text-xs font-normal leading-normal">
    {{ address }}
    </div>
  </div>

    <div v-else>
      {{ address }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { ethers } from "ethers";
import { useRouter } from 'vue-router';


declare global {
  interface Window {
    ethereum?: any;
  }
}

const isLoggedIn = ref(false);
const address = ref("");
const isMetamaskInstalled = ref(false);

onMounted(async () => {
  isMetamaskInstalled.value = typeof window.ethereum !== "undefined";
});

const router = useRouter();

const startQuiz = () => {
  router.push('/quizz');
};

const connectWallet = async () => {
  if (isMetamaskInstalled.value) {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      address.value = ethers.getAddress(accounts[0]);
      isLoggedIn.value = true;

      // Log the address after it has been updated
      signWallet();
    } catch (err) {
      console.error("Failed to connect to Metamask", err);
    }
  }
};
const signWallet = async () => {
  try {
    const headers: HeadersInit = {
      Accept: "application.json",
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    };
    const addressWallet = address.value;
    const getUrl =
    `https://backend-quiz-dot-tools-303211.nw.r.appspot.com/auth/message/${addressWallet}`;
    const response = await fetch(getUrl, {
          method: "GET",
          headers,
          mode: "cors",
          cache: "default",
        });
    const res = await response.json();
    const message = res.message;
    


    const sign = await window.ethereum.request({
      method: "personal_sign",
      params: [message, addressWallet],
    });
    console.log("adresse wallet", addressWallet);
    console.log("signature", sign);

    // const provider = new ethers.BrowserProvider(window.ethereum);
    // // It will prompt user for account connections if it isnt connected
    // const signer = await provider.getSigner();
    // console.log("Account:", await signer.getAddress());



    const urlPost = new URL(
      "https://backend-quiz-dot-tools-303211.nw.r.appspot.com/auth"
    );
    const payload = {
      address: addressWallet,
      signature: sign,
    };
    const post = await fetch(urlPost, {
      method: "POST",
      headers,
      mode: "cors",
      body: JSON.stringify(payload),
      cache: "default",
    });

    const resPost = await post.json();

    console.log("resPost", resPost);
    const token = resPost.access_token;

    //local storage
    localStorage.setItem('jwt', token);
    console.log("token", token);

    // router.push('/quizz');
  } catch (error) {
    console.error(error);
  }
};
</script>
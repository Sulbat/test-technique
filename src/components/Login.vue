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
      <div
        v-else
        class="text-center text-black bg-red-500 p-4 rounded-md shadow-lg max-w-md mx-auto mt-4 font-bold"
      >
        Please Install Metamask Extension
      </div>
    </div>

    <div v-else>
      {{ address }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import axios from "axios";
import { ethers } from "ethers";

const isLoggedIn = ref(false);
const address = ref("");
const isMetamaskInstalled = ref(false);

onMounted(async () => {
  isMetamaskInstalled.value = typeof window.ethereum !== "undefined";
});

const connectWallet = async () => {
  if (isMetamaskInstalled.value) {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      address.value = accounts[0];
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
    const addressWallet = address.value;
    const apiUrl =
      "https://backend-quiz-dot-tools-303211.nw.r.appspot.com/auth/message";
    const response = await axios.get(`${apiUrl}/${addressWallet}`, {
      headers: {
        accept: "application/json",
      },
    });
    const message = response.data.message;

    const sign = await window.ethereum.request({
      method: "personal_sign",
      params: [message, addressWallet],
    });
    console.log("adresse wallet", addressWallet);
    console.log("signature", sign);

    // const apiUrl_p2 = "https://backend-quiz-dot-tools-303211.nw.r.appspot.com/auth";
    // const response_2 = await axios.post(`${apiUrl_p2}`, {
    //   headers: {
    //     accept: "*/*",
    //     'Content-Type': 'application/json'
    //   },
    //   data: {
    //     "address": addressWallet,
    //     "signature": sign,
    //   }
    // });

    const headers: HeadersInit = {
      Accept: "application.json",
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    };

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
    console.log("token", token);

    // console.log("response_2", response_2)
  } catch (error) {
    console.error(error);
  }
};
</script>

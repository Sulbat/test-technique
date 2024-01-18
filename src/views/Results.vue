<template>
  <div
    class="bg-[url('https://s3-alpha-sig.figma.com/img/1e3d/fd79/f027a5a10046d6899c3bf9713b1aa78a?Expires=1706486400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=SY4iOqaSBNz-7SStmbJA~neRnPLVJyW5QInDYrMGY2dowIsewRUMm6gNpbhsu-PYuldIZQSKdyoWdaTn~Vq1cLurvUIHLuRq2FpH2Qz9xdh28hGWdpujE3Gfj069NM9ZzJy6kNAdnjfKc2Pb~7knYI-hftzQXV0aDfRloVJodLU-1TVe5ICJ8LpHtcYKqjSq8rjqV-6TTHuZDvfBXvqZigAHWBGvHXMCFa6ltPxd6G5~GkQD2u405U9f4g6vVgLkxzi1182fQIGYQJuVuFEDGJfKmMnrFyTkVB2nEtWTrJTD2wCRg7bdPpA29G-QNj2iR8t24HzW79NL9GVzLo1OhA__')] bg-cover bg-no-repeat h-screen flex items-center justify-center"
  >
    <div class="flex justify-center items-center h-screen space-x-6">
      <div
        class="bg-white bg-opacity-15 h-[449px] w-[608px] m-4 rounded-lg px-8 flex flex-col items-center shadow-md backdrop-blur"
      >
        <div class="">
          <div class="end text-4xl">
            <div class="flex justify-center">🎉<br /></div>
            <div class="text-white">Le Quiz est terminé !<br /><br /></div>
            <div
              class="flex justify-center text-custom-color stroke-text shadow-text mb-4"
            >
              Bravo !
            </div>
          </div>
          <div class="text-white ml-8 mb-3 flex items-center">
            Meilleur temps : XX/XX
            <div class="bg-black text-custom-color ml-2 px-3 py-1 rounded">
              New!
            </div>
          </div>
        </div>
        <button
          class="bg-blue-600 text-white w-[209px] h-[42px] rounded shadow-custom mt-4"
          @click="callContractFunction"
        >
          MINT MY CERTIFICATE
        </button>
      </div>
      <div
        class="bg-white bg-opacity-15 h-[449px] w-[608px] m-4 rounded-lg px-8 shadow-md backdrop-blur text-white"
      >
        <div class="text-2xl mt-6">Détail des résultats :</div>
        <table class="table-auto rounded bg-black bg-opacity-20 mt-5">
          <tbody>
            <tr>
              <td class="table-question">[Question]</td>
              <td>15s</td>
            </tr>
            <tr>
              <td class="table-question">[Question]</td>
              <td>89s</td>
            </tr>
            <tr>
              <td class="table-question">[Question]</td>
              <td>48s</td>
            </tr>
            <tr>
              <td class="table-question">[Question]</td>
              <td>66s</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ethers } from "ethers";

export default defineComponent({
  name: "SmartContractInteraction",
  data() {
    return {
      provider: null as ethers.JsonRpcProvider | null,
      contract: null as ethers.Contract | null,
    };
  },
  methods: {
    async initializeEthers() {
      // Connexion au fournisseur Ethereum (Alchemy)
      const provider = new ethers.JsonRpcProvider(
        "https://eth-goerli.g.alchemy.com/v2/qjqERS-ofZV8pO4BJ1Ul17IfLbP7_SFq"
      );

      async function getBlockNumber() {
        const blockNumber = await provider.getBlockNumber();
        console.log("Current block number:", blockNumber);
      }
      getBlockNumber();

      // Informations du smart contract
      const contractAddress = "0x5d2c7926525cf1174e04d60a5496363c986d3d5d";
      const contractABI = [
        { inputs: [], stateMutability: "nonpayable", type: "constructor" },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "owner",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "approved",
              type: "address",
            },
            {
              indexed: true,
              internalType: "uint256",
              name: "tokenId",
              type: "uint256",
            },
          ],
          name: "Approval",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "owner",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "operator",
              type: "address",
            },
            {
              indexed: false,
              internalType: "bool",
              name: "approved",
              type: "bool",
            },
          ],
          name: "ApprovalForAll",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "previousOwner",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "newOwner",
              type: "address",
            },
          ],
          name: "OwnershipTransferred",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "from",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              indexed: true,
              internalType: "uint256",
              name: "tokenId",
              type: "uint256",
            },
          ],
          name: "Transfer",
          type: "event",
        },
        {
          inputs: [
            { internalType: "address", name: "to", type: "address" },
            { internalType: "uint256", name: "tokenId", type: "uint256" },
          ],
          name: "approve",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [{ internalType: "address", name: "owner", type: "address" }],
          name: "balanceOf",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            { internalType: "uint256", name: "tokenId", type: "uint256" },
          ],
          name: "getApproved",
          outputs: [{ internalType: "address", name: "", type: "address" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "getbaseURI",
          outputs: [{ internalType: "string", name: "", type: "string" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            { internalType: "address", name: "owner", type: "address" },
            { internalType: "address", name: "operator", type: "address" },
          ],
          name: "isApprovedForAll",
          outputs: [{ internalType: "bool", name: "", type: "bool" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              components: [
                { internalType: "bytes32", name: "r", type: "bytes32" },
                { internalType: "bytes32", name: "s", type: "bytes32" },
                { internalType: "uint8", name: "v", type: "uint8" },
              ],
              internalType: "struct NftQuiz.Coupon",
              name: "coupon",
              type: "tuple",
            },
            { internalType: "uint256", name: "score", type: "uint256" },
            { internalType: "uint256", name: "tokenId", type: "uint256" },
          ],
          name: "mint",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "name",
          outputs: [{ internalType: "string", name: "", type: "string" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "owner",
          outputs: [{ internalType: "address", name: "", type: "address" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            { internalType: "uint256", name: "tokenId", type: "uint256" },
          ],
          name: "ownerOf",
          outputs: [{ internalType: "address", name: "", type: "address" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "renounceOwnership",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            { internalType: "address", name: "from", type: "address" },
            { internalType: "address", name: "to", type: "address" },
            { internalType: "uint256", name: "tokenId", type: "uint256" },
          ],
          name: "safeTransferFrom",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            { internalType: "address", name: "from", type: "address" },
            { internalType: "address", name: "to", type: "address" },
            { internalType: "uint256", name: "tokenId", type: "uint256" },
            { internalType: "bytes", name: "data", type: "bytes" },
          ],
          name: "safeTransferFrom",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            { internalType: "address", name: "operator", type: "address" },
            { internalType: "bool", name: "approved", type: "bool" },
          ],
          name: "setApprovalForAll",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [{ internalType: "string", name: "uri", type: "string" }],
          name: "setBaseUri",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            { internalType: "bytes4", name: "interfaceId", type: "bytes4" },
          ],
          name: "supportsInterface",
          outputs: [{ internalType: "bool", name: "", type: "bool" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "symbol",
          outputs: [{ internalType: "string", name: "", type: "string" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            { internalType: "uint256", name: "tokenId", type: "uint256" },
          ],
          name: "tokenURI",
          outputs: [{ internalType: "string", name: "", type: "string" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            { internalType: "address", name: "from", type: "address" },
            { internalType: "address", name: "to", type: "address" },
            { internalType: "uint256", name: "tokenId", type: "uint256" },
          ],
          name: "transferFrom",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            { internalType: "address", name: "newOwner", type: "address" },
          ],
          name: "transferOwnership",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
      ] as const;

      // Connexion au smart contract
      this.contract = new ethers.Contract(
        contractAddress,
        contractABI,
        provider
      );
    },

    async callContractFunction() {
      if (!this.contract) return;

      try {
        // Appel de la fonction du smart contract
        const result = await this.contract.name();
        console.log("Résultat de la fonction :", result);
      } catch (error) {
        console.error(
          "Erreur lors de l'appel de la fonction du smart contract:",
          error
        );
      }
    },
  },
  mounted() {
    this.initializeEthers();
  },
});
</script>

<style scoped>
.text-custom-color {
  color: #0aeadf;
}

.stroke-text {
  -webkit-text-stroke-color: rgba(0, 0, 0, 0.5);
  -webkit-text-stroke-width: 1px;
}

.shadow-text {
  text-shadow: 0px 0px 10px rgba(255, 255, 255, 0.25);
}

.table-question {
  padding: 10px 400px 10px 10px;
}
</style>

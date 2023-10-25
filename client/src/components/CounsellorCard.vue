<template>
  <div class="bg-purple-800 font-semibold text-center text-white rounded-3xl border shadow-lg p-10 max-w-xs">
    <img class="mb-3 w-32 h-32 rounded-full shadow-lg mx-auto"
      src="../../profile.png"
      alt="gambar konselor">
    <h1 class="text-lg text-black">{{ counselor.name }}</h1>
    <h3 class="text-sm text-black">{{ counselor.specialization }}</h3>
    <h3 class="text-sm text-black"> Category: {{ counselor.Category.name }}</h3>
    <h3 class="text-sm text-black"> Harga: Rp.{{ counselor.fee }}</h3>
   
    <button class="bg-white px-8 py-2 mt-8 rounded-3xl text-black font-semibold uppercase tracking-wide" @click="handleChatClick()"  >chat</button>
  </div>
</template>

<script>
import { mapActions } from 'pinia';
import { useCounterStore } from '../stores/counter';
export default {
  props: ['counselor'],
  methods:{
    ...mapActions(useCounterStore, ['buyTicket']),
    handleChatClick() {
      // Memanggil metode buyTicket dengan objek yang sesuai
      this.buyTicket({ price: this.counselor.fee, counselorId: this.counselor.id });

      // Menyimpan counselor.id ke localStorage
      localStorage.setItem("counselorId", this.counselor.id);
    },
  }
}
</script>

<style lang="scss" scoped></style>
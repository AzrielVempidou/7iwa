<template>
  <div>
    <div class="bg-gray-100 flex justify-center items-center h-screen">
    <!-- Left: Image -->
<div class="w-1/2 h-screen hidden lg:block">
  <img src="https://placehold.co/800x/667fff/ffffff.png?text=Wellcome&font=Montserrat" alt="Placeholder Image" class="object-cover w-full h-full">
</div>
<!-- Right: Login Form -->
<div class="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
  <h1 class="text-2xl font-semibold mb-4">Login</h1>
  <form @submit.prevent="handleLoginCust(formLogin)">
    <!-- Username Input -->
    <div class="mb-4">
      <label for="email" class="block text-gray-600">email</label>
      <input v-model="formLogin.email" type="email" id="username" name="username" class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autocomplete="off">
    </div>
    <!-- Password Input -->
    <div class="mb-4">
      <label for="password" class="block text-gray-600">Password</label>
      <input v-model="formLogin.password" type="password" id="password" name="password" class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autocomplete="off">
    </div>
    <!-- Forgot Password Link -->
    <div class="mb-6 text-blue-500">
      <a href="#" class="hover:underline">Don't have an account yet?</a>
    </div>
    <!-- Login Button -->
    <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full">Login</button>
  </form>
  <div class="mt-6 text-blue-500 text-center">
    <router-link to="/counselor/login" >
      <button class="group relative h-12 w-48 overflow-hidden rounded-2xl bg-green-500 text-lg font-bold text-white">
    Login As Counselor
    <div class="absolute inset-0 h-full w-full scale-0 rounded-2xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
  </button>
    </router-link>
  </div>
  <!-- Sign up  Link -->
</div>
</div>
  </div>
</template>

<script>
  import { mapActions } from  'pinia'
  import { useCounterStore } from '../stores/counter'
export default {
  data() {
    return {
      formLogin: {
        email: "azriel.vempidou00@gmail.com",
        password: "test1"
      },
    }
  },
  methods: {
    ...mapActions(useCounterStore, ['handleLoginCust'])
  }
}
</script>

<style lang="scss" scoped>

</style>
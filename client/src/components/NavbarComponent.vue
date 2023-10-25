<template>
  <div style="position: sticky; top: 0;">
    <section class="relative mx-auto">
      <!-- navbar -->
      <nav class="flex justify-between bg-gray-900 text-white w-screen">
        <div class="px-5 xl:px-12 py-6 flex w-full items-center">
          <a class="text-3xl font-bold font-heading" href="#">
            <!-- <img class="h-9" src="logo.png" alt="logo"> -->
            7iwa.
          </a>

          <!-- Nav Links -->
          <ul class="flex px-4 mx-auto font-semibold font-heading space-x-12">
          </ul>
          <!-- Header Icons -->
          <div class="flex items-center space-x-5 items-center">

            <RouterLink to="/" class="hover:text-gray-200">Home</RouterLink>
            <RouterLink to="/register" v-if="!isLogin" class="hover:text-gray-200">Register</RouterLink>
            <RouterLink to="/customer/login" v-if="!isLogin" class="hover:text-gray-200">Login</RouterLink>
            <RouterLink to="/login" v-if="!isLogin" class="hover:text-gray-200">Chat</RouterLink>
            <RouterLink to="/login" v-if="!isLogin" class="hover:text-gray-200">History</RouterLink>
            <button v-if="isLogin" @click.prevent="doLogOut()" class="hover:text-gray-200">Log Out</button>
            <!-- Sign In / Register      -->
            <router-link to="/register" class="flex items-center hover:text-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 hover:text-gray-200" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </router-link>

          </div>
        </div>
      </nav>

    </section>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss" scoped>

</style>
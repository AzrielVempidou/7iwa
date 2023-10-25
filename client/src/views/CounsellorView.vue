<template>
  <div class="flex items-center justify-between">
    <span class="text-3xl font-bold text-gray-900 dark:text-white text-center mx-auto">Silahkan memilih konselor</span>
  </div>
  <div class="flex items-center justify-center grid-container h-screen">
    <div class="flex space-x-4">
      <CounsellorCard v-for="counselor in counselors" :key="counselor.id" :counselor="counselor" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import { useCounterStore } from '../stores/counter';
import CounsellorCard from '../components/CounsellorCard.vue';

export default {
  components: {
    CounsellorCard
  },
  computed: {
    ...mapState(useCounterStore, ['counselors'])
  },
  methods: {
    ...mapActions(useCounterStore, ['CategoryByConsellor']),
  },
  created() {
    this.CategoryByConsellor(this.$route.params.id)
  }
}
</script>

<style >
.grid-container {
  display: grid;
  grid-template-columns: auto auto auto auto;
}
</style>
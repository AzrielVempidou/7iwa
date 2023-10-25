<template>
  <div class="flex items-center justify-between">
    <span class="text-3xl font-bold text-gray-900 dark:text-white text-center mx-auto">Jelajahi Topik Konseling
      Umum</span>
  </div>
  <div class="mx-auto py-8">
    <div class="flex flex-wrap items-center lg:justify-between justify-center">
      <CategoryComponent v-for="category in categories" :key="category.id" :data="category" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import { useCounterStore } from '../stores/counter';
import CategoryComponent from '../components/CategoryComponent.vue';
export default {
  components: {
    CategoryComponent
  },
  computed: {
    ...mapState(useCounterStore, ['categories']),
  },
  methods: {
    ...mapActions(useCounterStore, ['handleFetchCategory'])
  },
  created() {
    this.handleFetchCategory()
  }
}
</script>

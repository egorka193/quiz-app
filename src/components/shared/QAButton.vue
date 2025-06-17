<template>
  <v-btn @click="handleClick">
    <slot />
  </v-btn>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  methods: {
    handleClick() {
      console.log('Кнопка нажата!');
    },
  },
});
</script>

<style scoped>

</style>
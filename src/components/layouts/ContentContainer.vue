<template>
  <div class="container">
    <RouterView />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
});
</script>

<style scoped>
.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 7px;
}
</style>

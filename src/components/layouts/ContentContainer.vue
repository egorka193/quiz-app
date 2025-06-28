<template>
  <div class="content-container">
    <RouterView />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
});
</script>

<style scoped>
.content-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 7px;
}
</style>

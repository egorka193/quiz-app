<template>
  <div class="app">
    <QAHeader />
    <ContentContainer />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import QAHeader from './components/layouts/Header.vue';
import ContentContainer from './components/layouts/ContentContainer.vue';
export default defineComponent({
  name: 'App',
  components: {
    QAHeader,
    ContentContainer,
  },
});
</script>

<style scoped>
</style>

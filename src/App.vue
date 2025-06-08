<template>
  <div class="app">
    <QAHeader />
    <div class="app__intro">
      <h2 class="app__title">
        Explore Quizzes
      </h2>
      <p class="app__description">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus recusandae tempore architecto.
      </p>
    </div>
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
.app__intro {
  margin: 0 auto;
  text-align: center;
  width: 600px;
}
.app__description{
  margin: 0 auto;
  font-size: 20px;
}
.app__title{
  font-size: 30px;
}
</style>

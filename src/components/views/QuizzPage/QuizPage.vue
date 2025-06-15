<template>
  <div class="app">
    <div class="app__intro">
      <h2 class="app__title">
        Explore Quizzes
      </h2>
      <p class="app__description">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus recusandae tempore architecto.
      </p>
    </div>
    <QuizzCards />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import QuizzCards from './QuizzCards.vue';

export default defineComponent({
  components: {
    QuizzCards,
  },
});
</script>


<style scoped>
.app__intro {
  margin: 0 auto 30px auto;
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

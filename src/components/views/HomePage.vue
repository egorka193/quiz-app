<template>
  <div class="home-page">
    <h2 class="home-title">
      Welcome to Quiz
    </h2>
    <p class="home-subtitle">
      Test your knowledge. Learn something new.
    </p>
    <span class="home-description">
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam aut enim ab distinctio repudiandae eaque beatae excepturi cumque voluptatem obcaecati.
    </span>
    <div class="home-actions">
      <RouterLink :to="{ name: RoutesNames.Quizes }">
        Explore Quizzes &rarr;
      </RouterLink>
    </div>
    <img 
      src="/src/assets/img/brainPhoto.avif"
      class="home-image"
    >
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { RoutesNames } from '@/router/types';

export default defineComponent({
  setup() {
    return {
      RoutesNames,
    };
  },
});
</script>

<style scoped>
.home-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.home-image {
  max-width: 100%;
  height: 300px;
  margin-bottom: 24px;
  border-radius: 12px;
}
.home-subtitle {
  font-size: 24px;
  color: #2dc123;
  margin-bottom: 16px;
}

.home-title {
  font-weight: 700;
  font-size: 80px;
  color: #111827;
  margin-bottom: 16px;
}

.home-description {
  font-size: 20px;
  max-width: 600px;
  font-size: 24px;
  color: #000000;
  margin-bottom: 16px;
}

.home-actions {
  margin-top: 16px;
  margin-bottom: 16px;
}

.home-actions a {
  display: inline-block;
  padding: 12px 24px;
  background-color: #4f46e5;
  color: #fff;
  font-weight: 600;
  text-decoration: none;
  border-radius: 8px;
  transition: background-color 0.3s ease;
}

.home-actions a:hover {
  background-color: #4338ca;
}
</style>

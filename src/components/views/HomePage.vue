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
      <RouterLink to="/quizzes">
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

export default defineComponent({
});
</script>


<style scoped>
.home-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
}

.home-image {
  max-width: 100%;
  height: 300px;
  margin-bottom: 1.5rem;
  border-radius: 12px;
}
.home-subtitle {
  font-size: 1.5rem;
  color: #2dc123;
  margin-bottom: 1rem;
}

.home-title {
  font-weight: 700;
  font-size: 5rem;
  color: #111827;
  margin-bottom: 1rem;
}

.home-description {
  font-size: 20px;
  max-width: 600px;
  font-size: 1.5rem;
  color: #000000;
  margin-bottom: 1rem;
}

.home-actions {
  margin-top: 1rem;
  margin-bottom: 1rem;
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

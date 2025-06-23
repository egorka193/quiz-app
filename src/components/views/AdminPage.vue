<template>
  <div class="home-page">
    <h2 class="home-title">
      Welcome to AdminPage
    </h2>

    <div 
      v-for="test in selectedTests"
      :key="test.id"
      class="home-tests"
    >
      <div class="home-test">
        <div>
          <h3>{{ test.title }}</h3>
          <span>{{ test.description }}</span>
        </div>
        <div>
          <RouterLink 
            :to="{ name: 'Edit', params: { id: test.id } }"
            class="home-test__action"
          >
            Edit
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { allTests } from '@/resourses/allTests';

export default defineComponent({
  setup() {
    return {
      selectedTests: allTests,
    };
  },
  
});
</script>

<style scoped>
.home-test {
  background-color: aliceblue;
  margin: 10px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
}
.home-test__action {
  background-color: rgba(0, 255, 255, 0.364);
  padding: 10px;
  border-radius: 10px;
  transition: all 0.5s;
}
.home-test__action:hover {
  background-color: rgba(0, 255, 255, 0.599);
}
</style>

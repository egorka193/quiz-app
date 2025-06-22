<template>
  <div class="header">
    <div class="header-wrapper">
      <div class="header__logo">
        <RouterLink :to="{ name: RoutesNames.Home }">
          QUIZAPP
        </RouterLink>
      </div>
      <div class="header__nav">
        <div class="header__nav-item">
          <RouterLink :to="{ name: RoutesNames.Home }">
            <i class="mdi mdi-home" />
            Home
          </RouterLink>
        </div>
        <div class="header__nav-item">
          <RouterLink :to="{ name: RoutesNames.Quizes }">
            <i class="mdi mdi-list-box" />
            Quizzes
          </RouterLink>
        </div>

        <div 
          v-if="userStore.user" 
          class="header__user"
        >
          <span class="header__username">
            <i class="mdi mdi-account" />
            <RouterLink :to="{ name: RoutesNames.Admin }">
              {{ userStore.user.name }}
            </RouterLink>
          </span>
          <ModalSignIn
            @close="closeModal"
          />
        </div>
        <ModalSignIn
          v-else
          @close="closeModal"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import ModalSignIn from '@/components/layouts/ModalSignIn.vue';
import { useUserStore } from '@/pinia/pinia';
import { RoutesNames } from '@/router/types';

export default defineComponent({
  components: {
    ModalSignIn,
  },
  setup() {
    const showModal = ref(false);
    const userStore = useUserStore();

    const openModal = () => {
      showModal.value = true;
    };
    const closeModal = () => {
      showModal.value = false;
    };

    return {
      openModal,
      showModal,
      closeModal,
      userStore,
      RoutesNames,
    };
  },
});
</script>

<style scoped>
.header{
  background-color: #fff;
  box-shadow: -1px 5px 5px 0px rgba(0,0,0,0.14);
  -webkit-box-shadow: -1px 5px 5px 0px rgba(0,0,0,0.14);
  -moz-box-shadow: -1px 5px 5px 0px rgba(0,0,0,0.14);
  margin-bottom: 20px;
}
.header__logo {
  font-weight: 600;
  font-size: 20px;
}
.header-wrapper {
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  padding: 7px;
  align-items: center;
}
.header__nav {
  display: flex;
  gap: 20px;
}

.header__user {
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: rgba(195, 243, 243, 0.7);
  padding: 0 5px;
  border-radius: 10px;
  cursor: pointer;
}

.header__nav-item {
  display: flex;
  gap: 10px;
  padding: 7px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.5s ease;
}
.header__nav-item:hover {
  background-color: rgb(127, 253, 255);
}
.header__nav-sign-in{
  background-color: rgba(135, 222, 222, 0.603);
}
.header__logout {
  box-shadow: none;
  background-color: rgba(195, 243, 243, 0.071);
}
.header__username {
  display: flex;
  gap: 10px;
}
.v-btn--size-defaul{
  padding: 0px;
}
</style>

<template>
  <div class="header">
    <div class="header-wrapper">
      <div>
        <h3>QUIZAPP</h3>
      </div>
      <div class="header__nav">
        <div class="header__nav-item">
          <i class="mdi mdi-home" />
          <RouterLink to="/home">Home</RouterLink>
        </div>
        <div class="header__nav-item">
          <i class="mdi mdi-list-box" />
          <RouterLink to="/quizzes">Quizzes</RouterLink>
        </div>

        <div v-if="userStore.user" class="header__user">
          <span class="header__username">
            <i class="mdi mdi-account" />
            {{ userStore.user.name }}
          </span>
          <button @click="logout" class="header__logout">
            <i class="mdi mdi-logout" />
            Выйти
          </button>
        </div>

        <div
          v-else
          class="header__nav-item header__nav-sign-in"
          @click="openModal"
        >
          <i class="mdi mdi-login" />
          <span>Войти</span>
        </div>
      </div>
    </div>
    <ModalSignIn 
      v-if="showModal"
      @close="closeModal"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import ModalSignIn from '@/ModalSignIn.vue';
import { useUserStore } from '@/pinia/pinia';
import { useRouter } from 'vue-router';

export default defineComponent({
  components: {
    ModalSignIn,
  },
  setup() {
    const showModal = ref(false);
    const userStore = useUserStore();
    const router = useRouter();

    const openModal = () => {
      showModal.value = true;
    };
    const closeModal = () => {
      showModal.value = false;
    };

    const logout = async () => {
      userStore.logout();
      await router.push({ name: 'Home' });
    };

    return {
      openModal,
      showModal,
      closeModal,
      userStore,
      logout,
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
  padding: 6px 12px;
  border-radius: 10px;
  cursor: pointer;
}

.header__nav-item {
  display: flex;
  gap: 10px;
  padding: 7px;
  cursor: pointer;
  transition: all 0.5s ease;
}
.header__nav-item:hover {
  background-color: rgb(127, 253, 255);
}
.header__nav-sign-in{
  background-color: rgba(135, 222, 222, 0.603);
}
</style>

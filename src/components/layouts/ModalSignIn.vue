<template>
  <QAModal ref="loginModal">
    <template #activator="{ open }">
      <v-btn
        class="modal__btn-enter"
        variant="flat"
        @click="isLoggedIn ? handleLogout() : open()"
      >
        <v-icon start>
          {{ isLoggedIn ? 'mdi-logout' : 'mdi-login' }}
        </v-icon>
        {{ isLoggedIn ? 'Выйти' : 'Войти' }}
      </v-btn>
    </template>

    <template 
      v-if="!isLoggedIn"
      #title
    >
      Вход
    </template>

    
    <template 
      v-if="!isLoggedIn"
      #body
    >
      <div class="modal__content">
        <input 
          v-model="login"
          placeholder="Логин" 
          class="modal-input" 
        />
        <input 
          v-model="password" 
          type="password" 
          placeholder="Пароль" 
          class="modal-input" 
        />
        <p 
          v-if="errorMessage"
          class="modal-error"
        >
          {{ errorMessage }}
        </p>
      </div>
    </template>

    <template 
      v-if="!isLoggedIn"
      #actions
    >
      <v-btn 
        text="Войти"
        @click="handleLogin"
      />
      <v-btn 
        text="Гость"
        @click="handleGuest" 
      />
    </template>
  </QAModal>
</template>

<script lang="ts">
import { ref, computed } from 'vue';
import QAModal from '@/components/shared/QAModal.vue';
import { useUserStore } from '@/pinia/pinia';
import { useRouter } from 'vue-router';
import { RoutesNames } from '@/router/types';

export default {
  components: { QAModal },
  setup() {
    const login = ref('');
    const password = ref('');
    const errorMessage = ref('');
    const loginModal = ref<InstanceType<typeof QAModal> | null>(null);
    const userStore = useUserStore();
    const router = useRouter();

    const isLoggedIn = computed(() => !!userStore.user);

    const handleLogin = async () => {
      const success = await userStore.login(login.value, password.value);
      if (success) {
        loginModal.value?.close();
        if (login.value === 'Admin') {
          await router.push({ name: RoutesNames.Admin });
        } else {
          await router.push({ name: RoutesNames.Quizes });
        }
      } else {
        errorMessage.value = 'Неверный логин или пароль';
      }
    };

    const handleGuest = () => {
      userStore.loginAsGuest();
      loginModal.value?.close();
    };

    const handleLogout = async () => {
      userStore.logout();
      await router.push({ name: 'Home' });
    };

    return {
      login,
      password,
      errorMessage,
      loginModal,
      isLoggedIn,
      handleLogin,
      handleGuest,
      handleLogout,
    };
  },
};
</script>

<style scoped>
.modal-input {
  border: 1px solid rgba(128, 128, 128, 0.331);
  padding: 10px;
  border-radius: 10px;
}
.modal-error {
  color: red;
  text-align: center;
}
.modal__btn-enter {
  background-color: rgba(195, 243, 243, 0.264);
}
.modal__content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>

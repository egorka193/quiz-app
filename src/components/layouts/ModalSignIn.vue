<template>
  <QAModal ref="loginModal">
    <template #activator="{ open }">
      <v-btn
        :class="[isLoggedIn ? 'disabled' : '']"
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
        await router.push({ name: 'Admin' });
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
</style>

<template>
  <v-dialog max-width="500">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        v-if="isLoggedIn"
        v-bind="activatorProps"
        variant="flat"
        @click="logout"
      >
        <i class="mdi mdi-login" />
        Выйти
      </v-btn>
      <v-btn
        v-else
        v-bind="activatorProps"
        variant="flat"
      >
        <i class="mdi mdi-login" />
        Войти
      </v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card title="Вход">
        <v-card-text>
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
          <p v-if="errorMessage" class="modal-error">
            {{ errorMessage }}
          </p>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn
            text="Войти"
            @click="loginAsAdmin(isActive)"
          />
          <v-btn
            text="Гость"
            @click="loginAsGuest(isActive)"
          />
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>


<script lang="ts">
import { useUserStore } from '@/pinia/pinia';
import { computed, defineComponent, ref, type Ref } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const login = ref('');
    const password = ref('');
    const errorMessage = ref('');
    const router = useRouter();
    const userStore = useUserStore();
    const isLoggedIn = computed(() => !!userStore.user);

    const loginAsAdmin = async (isActive: Ref<boolean>) => {
      const success = await userStore.login(login.value, password.value);
      if (success) {
        isActive.value = false;
        await router.push({ name: 'Admin' });
      } else {
        errorMessage.value = 'Неверный логин или пароль';
      }
    };

    const logout = async () => {
      userStore.logout();
      await router.push({ name: 'Home' });
    };

    const loginAsGuest = (isActive: Ref<boolean>) => {
      userStore.loginAsGuest();
      isActive.value = false;
    };

    return {
      login,
      password,
      errorMessage,
      loginAsAdmin,
      loginAsGuest,
      isLoggedIn,
      logout,
    };
  },
});
</script>

<style scoped>
.modal-input {
  width: 100%;
  padding: 0.6rem 1rem;
  margin-bottom: 1rem;
  border: 1.5px solid #ccc;
  border-radius: 10px;
  font-size: 1rem;
  transition: border-color 0.3s;
  outline: none;
}

.modal-input:focus {
  border-color: #00bcd4;
  box-shadow: 0 0 6px #00bcd4;
}

.modal-error {
  color: red;
  margin: 0.5rem 0;
  text-align: center;
}
.v-btn{
  background-color: rgba(190, 245, 245, 0);
}
</style>
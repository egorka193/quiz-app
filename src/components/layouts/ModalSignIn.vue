<template>
  <div 
    class="modal-overlay"
    @click.self="close"
  >
    <div class="modal">
      <h2 class="modal-title">
        Вход
      </h2>

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

      <div class="modal-buttons">
        <QAButton 
          class="btn btn-admin"
          @click="loginAsAdmin"
        >
          Войти
        </QAButton>
        <QAButton 
          class="btn btn-guest"
          @click="loginAsGuest"
        >
          Войти как гость
        </QAButton>
      </div>

      <QAButton 
        class="close"
        size="small"
        @click="close"
      >
        ×
      </QAButton>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useUserStore } from '@/pinia/pinia';
import { useRouter } from 'vue-router';
import QAButton from '../shared/QAButton.vue';

export default defineComponent({
  components: {
    QAButton,
  },
  emits: ['close'],
  setup(props, ctx) {
    const login = ref('');
    const password = ref('');
    const errorMessage = ref('');
    const router = useRouter();

    const userStore = useUserStore();

    const loginAsAdmin = async () => {
      const success = await userStore.login(login.value, password.value);
      if (success) {
        ctx.emit('close');
        await router.push({ name: 'Admin' });
      } else {
        errorMessage.value = 'Неверный логин или пароль';
      }
    };

    const loginAsGuest = () => {
      userStore.loginAsGuest(); 
      ctx.emit('close');
    };

    const close = () => {
      ctx.emit('close');
    };

    return {
      login,
      password,
      errorMessage,
      close,
      loginAsAdmin,
      loginAsGuest,
    };
  },
});
</script>

<style scoped>
.modal-error {
  color: red;
  margin: 0.5rem 0;
  text-align: center;
}
.modal-overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal {
  background: #fff;
  padding: 32px 24px;
  border-radius: 16px;
  width: 350px;
  max-width: 90vw;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.25);
  position: relative;
  transform: translateY(-30px);
}
.modal-title {
  margin-top: 0;
  margin-bottom: 1.5rem;
  font-weight: 700;
  color: #333;
  text-align: center;
}

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

.modal-buttons {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-top: 16px;
}

.btn {
  padding: 12px;
  font-weight: 600;
  font-size: 16px;
  border-radius: 12px;
  cursor: pointer;
  border: none;
  transition: background-color 0.3s;
}

.btn-admin {
  background-color: #00bcd4;
  color: white;
}

.btn-admin:hover {
  background-color: #0097a7;
}

.btn-guest {
  background-color: #e0e0e0;
  color: #555;
}

.btn-guest:hover {
  background-color: #bdbdbd;
}

.close {
  position: absolute;
  top: 8px;
  right: 8px;
  font-size: 16px;
  background: transparent;
  border: none;
  color: #999;
  cursor: pointer;
  transition: color 0.3s;
  width: 20px;
}

.close:hover {
  color: #00bcd4;
}
</style>

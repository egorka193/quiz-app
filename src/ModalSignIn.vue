
<template>
  <div
    class="modal-overlay" 
    @click.self="close"
  >
    <div class="modal">
      <h2>Вход</h2>
      <input v-model="login" placeholder="Логин" />
      <input v-model="password" type="password" placeholder="Пароль" />

      <div class="buttons">
        <button @click="loginAsAdmin">Войти</button>
        <button @click="loginAsGuest">Войти как гость</button>
      </div>

      <button class="close" @click="close">×</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  name: 'AuthModal',
  emits: ['close'],
  setup(props, ctx) {
    const login = ref<string>('');
    const password = ref<string>('');

    const close = () => {
      ctx.emit('close');
    };

    const loginAsAdmin = () => {
      if (login.value === 'admin' && password.value === '1234') {
        alert('Успешный вход как админ');
        ctx.emit('close');
      } else {
        alert('Неверный логин или пароль');
      }
    };

    const loginAsGuest = () => {
      alert('Вы вошли как гость');
      ctx.emit('close');
    };

    return {
      login,
      password,
      close,
      loginAsAdmin,
      loginAsGuest,
    };
  },
});
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal {
  background: #fff;
  padding: 2rem 2.5rem;
  border-radius: 16px;
  width: 320px;
  max-width: 90vw;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.25);
  position: relative;
  transform: translateY(-30px);
}
h2 {
  margin-top: 0;
  margin-bottom: 1.5rem;
  font-weight: 700;
  color: #333;
  text-align: center;
}

input {
  width: 100%;
  padding: 0.6rem 1rem;
  margin-bottom: 1rem;
  border: 1.5px solid #ccc;
  border-radius: 10px;
  font-size: 1rem;
  transition: border-color 0.3s;
  outline: none;
}

input:focus {
  border-color: #00bcd4;
  box-shadow: 0 0 6px #00bcd4;
}

.buttons {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-top: 1.2rem;
}

button {
  flex: 1;
  padding: 0.6rem 0;
  font-weight: 600;
  font-size: 1rem;
  border-radius: 12px;
  cursor: pointer;
  border: none;
  transition: background-color 0.3s;
}

.buttons button:first-child {
  background-color: #00bcd4;
  color: white;
}

.buttons button:first-child:hover {
  background-color: #0097a7;
}

.buttons button:last-child {
  background-color: #e0e0e0;
  color: #555;
}

.buttons button:last-child:hover {
  background-color: #bdbdbd;
}

.close {
  position: absolute;
  top: 0.7rem;
  right: 0.7rem;
  font-size: 1.8rem;
  background: transparent;
  border: none;
  color: #999;
  cursor: pointer;
  transition: color 0.3s;
}

.close:hover {
  color: #00bcd4;
}
</style>
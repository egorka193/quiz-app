<template>
  <v-dialog 
    class="modal"
    v-model="isActive" 
    :max-width="maxWidth"
  >
    <template 
      v-slot:activator="{ props: activatorProps }"
    >
      <slot 
        name="activator" 
        v-bind="{ ...activatorProps, open }" 
      />
    </template>

    <v-card>
      <v-card-title class="modal-title">
        <div class="title-content">
          <slot name="title">
            Модальное окно
          </slot>
        </div>
        <v-btn 
          icon 
          @click="close" 
          variant="text" 
          class="close-btn"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text>
        <slot
          name="body"
        >
          Контент модалки
        </slot>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <slot name="actions">
          <v-btn @click="close">
            Закрыть
          </v-btn>
        </slot>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  props: {
    maxWidth: {
      type: [String, Number],
      default: 500,
    },
  },
  setup() {
    const isActive = ref(false);

    const open = () => {
      isActive.value = true;
    };

    const close = () => {
      isActive.value = false;
    };

    return {
      isActive,
      open,
      close,
    };
  },
});
</script>

<style scoped>
.modal-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.v-card-text {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
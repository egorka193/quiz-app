<template>
  <v-dialog 
    v-model="isActive" 
    class="qa-modal"
    :max-width="maxWidth"
  >
    <template #activator="{ props: activatorProps }">
      <slot 
        name="activator" 
        v-bind="{ ...activatorProps, open }" 
      />
    </template>

    <v-card>
      <v-card-title class="qa-modal-title">
        <div class="title-content">
          <slot name="title">
            {{ title }}
          </slot>
        </div>
        <v-btn 
          icon 
          variant="text" 
          class="close-btn"
          @click="close" 
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
    title: {
      type: String,
      default: 'Заголовок',
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
.qa-modal-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
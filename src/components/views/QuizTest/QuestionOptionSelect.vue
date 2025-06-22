<template>
  <li
    :class="{ selected: isSelected }"
    @click="handleClick"
  >
    {{ label }}
  </li>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    label: {
      type: String,
      required: true,
    },
    isSelected: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['select'],
  setup(_, { emit }) {
    const handleClick = () => {
      emit('select');
    };

    return {
      handleClick,
    };
  },
});
</script>

<style scoped>
.selected {
  background-color: #d3e5ff;
  font-weight: bold;
}
</style>

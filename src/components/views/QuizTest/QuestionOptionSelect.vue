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
  background-color: #4f46e5; 
  color: white;
  font-weight: 600;
  border-color: #4338ca; 
}
li {
  background: #f3f4f6;
  border-radius: 8px;
  padding: 10px 15px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  border: 2px solid transparent;
}
</style>

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
li {
  cursor: pointer;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  margin-bottom: 5px;
}
li:hover {
  background-color: #f0f0f0;
}
</style>

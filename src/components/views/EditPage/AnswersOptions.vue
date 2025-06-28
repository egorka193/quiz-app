<template>
  <div class="answers-options">
    <ul class="question-card__options-list">
      <li
        v-for="(item, index) in internalList"
        :key="index"
        class="question-card__option"
      >
        <input
          v-model="internalList[index]"
          class="edit-input"
          :placeholder="placeholder"
        />
        <QAButton 
          class="remove-btn" 
          @click="remove(index)"
        >
          <i class="mdi mdi-trash-can" />
        </QAButton>
      </li>
    </ul>
    <QAButton 
      class="add-btn" 
      @click="add"
    >
      <i class="mdi mdi-plus" /> Добавить
    </QAButton>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import QAButton from '@/components/shared/QAButton.vue';

export default defineComponent({
  components: {
    QAButton,
  },
  props: {
    modelValue: {
      type: Array as () => string[],
      required: true,
    },
    title: {
      type: String,
      default: 'Варианты',
    },
    placeholder: {
      type: String,
      default: '',
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const internalList = ref<string[]>([...props.modelValue]);

    watch(
      () => props.modelValue,
      (newVal) => {
        internalList.value = [...newVal];
      },
    );

    watch(
      internalList,
      (newVal) => {
        emit('update:modelValue', [...newVal]);
      },
      { deep: true },
    );

    const add = () => {
      internalList.value.push('');
    };

    const remove = (index: number) => {
      internalList.value.splice(index, 1);
    };

    return {
      internalList,
      add,
      remove,
    };
  },
});
</script>

<style scoped>
.edit-input {
  padding: 8px 10px;
  font-size: 14px;
  margin: 6px 0;
  border: 1px solid #ccc;
  border-radius: 6px;
  width: 100%;
  box-sizing: border-box;
  transition: border-color 0.2s;
}

.edit-input:focus {
  outline: none;
  border-color: #3f51b5;
  box-shadow: 0 0 0 2px rgba(63, 81, 181, 0.2);
}

.question-card__option {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.remove-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border: 1px solid #ccc;
  background-color: #f5f5f5;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s, border-color 0.2s;
}

.remove-btn:hover {
  background-color: #ffeaea;
  border-color: #e53935;
  color: #e53935;
}

.add-btn {
  display: inline-flex;
  align-items: center;
  padding: 6px 12px;
  font-size: 14px;
  background-color: #e3f2fd;
  border: 1px solid #64b5f6;
  color: #1976d2;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;
  gap: 6px;
  margin-bottom: 10px;
}

.add-btn:hover {
  background-color: #bbdefb;
  color: #0d47a1;
}

.question-card__options-title {
  font-weight: 500;
  margin-bottom: 5px;
  color: #555;
}
</style>

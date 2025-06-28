<template>
  <v-select
    v-model="model"
    :label="label"
    :items="items"
    item-title="title"
    item-value="value"
    class="qa-select"
    dense
    outlined
  />
</template>

<script lang="ts">
import { defineComponent, watch, ref } from 'vue';

export default defineComponent({
  props: {
    modelValue: {
      type: [String, Number, Boolean],
      required: true,
    },
    items: {
      type: Array as () => { title: string; value: unknown }[],
      required: true,
    },
    label: {
      type: String,
      default: '',
    },
  },
  emits: ['update:modelValue'],
  setup(props, ctx) {
    const model = ref(props.modelValue);

    watch(() => props.modelValue, (val) => {
      model.value = val;
    });

    watch(model, (val) => {
      ctx.emit('update:modelValue', val);
    });

    return { model };
  },
});
</script>

<style scoped>
.qa-select {
  width: 100%;
  margin: 6px 0;
}
</style>

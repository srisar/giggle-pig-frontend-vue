<template>
  <div class="mb-3 w-full form-control">
    <label class="label">
      <span class="label-text">{{ label }}</span>
    </label>
    <select class="select select-bordered w-full" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)">
      <option :value="null" selected disabled>Choose one</option>
      <option v-for="(item, key) in options" :value="key">{{ item }}</option>
    </select>
  </div>
</template>

<script setup>

defineProps({
  label: {
    type: String,
    default: 'Label'
  },
  options: {
    type: Object,
  },
  modelValue: {
    type: String
  }
});

defineEmits(['update:modelValue']);
</script>

<style scoped>

</style>
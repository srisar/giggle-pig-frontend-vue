<template>

  <div class="mb-3 w-full form-control">
    <label class="label">
      <span class="label-text">{{ label }}</span>
    </label>
    <input :type="type" class="w-full input input-bordered" :class="inputClass"
           :value="modelValue" @input="$emit('update:modelValue', $event.target.value)">
  </div>

</template>

<script setup>

defineProps({
  label: {
    type: String,
    default: 'Label'
  },
  inputClass: {
    type: [String, Object]
  },
  type: {
    type: String,
    default: 'text' /* text, password */
  },
  modelValue: {
    type: String
  }
});

defineEmits(['update:modelValue']);

</script>

<style scoped>

</style>
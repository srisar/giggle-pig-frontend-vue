<template>

  <ul class="p-0 px-2 menu menu-compact">
    <li v-if="topSeparator"></li>
    <li class="menu-title uppercase">
      <span>{{ title }}</span>
    </li>

    <slot/>

  </ul>

</template>

<script setup>

defineProps({
  title: {
    type: String,
    default: 'Menu'
  },
  topSeparator: {
    type: Boolean,
    default: false
  }
});

</script>

<style scoped>

</style>
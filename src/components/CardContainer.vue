<template>

  <div class="card w-full bg-base-300 shadow-xl">
    <section class="card-body p-2 md:p-3">

      <header class="card-title justify-center mb-5" v-if="hasHeader">
        <slot name="title"/>
      </header>

      <slot/>

      <footer class="flex gap-3 justify-end" v-if="hasFooter">
        <slot name="footer"/>
      </footer>

      <footer class="" v-if="hasFooter">
        <slot name="belowFooter"/>
      </footer>

    </section>
  </div>

</template>

<script setup>

defineProps({
  hasHeader: {
    type: Boolean,
    default: true
  },
  hasFooter: {
    type: Boolean,
    default: true
  }
});

</script>

<style scoped>

</style>
<template>

  <div class="card w-full bg-base-300 shadow-xl">
    <section class="card-body p-2 md:p-3">

      <header class="card-title justify-center mb-5">
        <slot name="title"/>
      </header>

      <slot/>

      <footer class="flex gap-3 justify-end">
        <slot name="footer"/>
      </footer>

      <footer class="">
        <slot name="belowFooter"/>
      </footer>

    </section>
  </div>

</template>

<script setup>

</script>

<style scoped>

</style>
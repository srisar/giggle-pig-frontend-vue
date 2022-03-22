<template>

  <div class="card w-full bg-base-300 shadow-xl">
    <section class="card-body">

      <header class="card-title justify-center">
        <slot name="title"/>
      </header>

      <main>
        <slot/>
      </main>

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
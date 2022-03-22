<!--suppress ALL -->
<template>

  <div class="drawer-side" style="scroll-behavior: smooth; scroll-padding-top: 5rem">
    <label for="my-drawer" class="drawer-overlay"></label>
    <aside class="overflow-y-auto w-64 bg-base-300 text-base-content">

      <div class="h-4"></div>

      <slot/>

    </aside>
  </div>

</template>

<script>
export default {
  name: 'DrawerBase'
};
</script>

<style scoped>

</style>
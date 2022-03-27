<template>

  <input type="checkbox" :id="id" class="modal-toggle" v-model="checkBox">
  <div class="modal">
    <div class="modal-box relative">
      <label class="btn btn-sm btn-circle absolute right-2 top-2" @click="handleClose">
        ✕
      </label>
      <section>

        <header class="text-lg font-bold uppercase">
          <slot name="header">Modal title</slot>
        </header>

        <main class="py-2">
          <slot>modal body</slot>
        </main>

        <footer class="gap-2 flex justify-end mt-5">
          <slot name="footer"/>
        </footer>

        <footer class="mt-5">
          <slot name="belowFooter"/>
        </footer>

      </section>
    </div>
  </div>

</template>

<script setup>

import {ref, watchEffect} from 'vue';

const emits = defineEmits(['closed']);

const props = defineProps({
  id: String,
  class: String,
  visible: Boolean
});

const checkBox = ref(false);

watchEffect(() => {
  checkBox.value = props.visible;
});


function handleClose() {
  emits('closed');
}

</script>

<style scoped>

</style>
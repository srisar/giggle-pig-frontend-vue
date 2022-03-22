<template>

  <div class="alert p-2 rounded" :class="alertColorClass">
    <div class="flex gap-2">
      <component :is="Icon" class="w-5 h-5"/>
      <span>
        <slot/>
      </span>
    </div>
  </div>

</template>

<script setup>
import {InformationCircleIcon, ExclamationCircleIcon, XCircleIcon, CheckCircleIcon} from '@heroicons/vue/outline';
import {computed} from 'vue';

const props = defineProps({
  type: {
    type: String,
    default: 'info' /* info, error, success, warning */
  }
});

const Icon = computed(() => {
  switch (props.type) {
    case 'info':
      return InformationCircleIcon;
    case 'error':
      return XCircleIcon;
    case 'warning':
      return ExclamationCircleIcon;
    case 'success':
      return CheckCircleIcon;
  }
});

const alertColorClass = computed(() => {
  switch (props.type) {
    case 'info':
      return 'alert-info';
    case 'error':
      return 'alert-error';
    case 'warning':
      return 'alert-warning';
    case 'success':
      return 'alert-success';
  }
});


</script>

<style scoped>

</style>
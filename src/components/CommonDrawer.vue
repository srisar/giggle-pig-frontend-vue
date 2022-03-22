<template>

  <DrawerBase>
    <ul class="menu menu-compact px-4 p-0">
      <li class="menu-title uppercase">
        <span>Pages</span>
      </li>
      <li>
        <router-link to="/about" class="flex gap-4 uppercase">
          <InformationCircleIcon class="w-5 h-5 flex-none"/>
          <span class="flex-1">About Giggle Pig</span>
        </router-link>
      </li>
    </ul>
  </DrawerBase>

</template>

<script setup>
import {InformationCircleIcon} from '@heroicons/vue/solid';
import DrawerBase from './drawers/DrawerBase.vue';
</script>

<style scoped>

</style>
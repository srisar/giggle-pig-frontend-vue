<template>

  <DrawerBase>

    <DrawerMenuGroup title="Pages">
      <li>
        <router-link to="/about" class="flex gap-4 uppercase">
          <InformationCircleIcon class="w-5 h-5 flex-none"/>
          <span class="flex-1">About Giggle Pig</span>
        </router-link>
      </li>
    </DrawerMenuGroup>


  </DrawerBase>

</template>

<script setup>
import DrawerMenuGroup from '@/components/drawers/DrawerMenuGroup.vue';
import {InformationCircleIcon} from '@heroicons/vue/solid';
import DrawerBase from './drawers/DrawerBase.vue';
</script>

<style scoped>

</style>
<template>


  <DrawerBase>

    <DrawerMenuGroup title="Pages">
      <li>
        <router-link to="/about" class="flex gap-4 uppercase">
          <InformationCircleIcon class="flex-none w-5 h-5"/>
          <span class="flex-1">About Giggle Pig</span>
        </router-link>
      </li>
    </DrawerMenuGroup><!-- pages -->

    <DrawerMenuGroup title="Users" :top-separator="true">
      <li>
        <router-link :to="{name: 'manageMe'}" class="uppercase">
          <UserIcon class="w-5 h-5"/>
          <span class="uppercase">Manage Me</span>
        </router-link>
      </li>

      <li v-if="user.isAdmin()">
        <router-link :to="{name: 'manageUsers'}" class="uppercase">
          <UsersIcon class="w-5 h-5"/>
          <span class="uppercase">Manage all users</span>
        </router-link>
      </li>
    </DrawerMenuGroup><!-- users -->

  </DrawerBase>


</template>

<script setup>
import DrawerBase from '@/components/drawers/DrawerBase.vue';
import DrawerMenuGroup from '@/components/drawers/DrawerMenuGroup.vue';
import AuthService from '@/services/authService.js';
import {InformationCircleIcon, UsersIcon, UserIcon} from '@heroicons/vue/solid';

/** @type{User} */
const user = AuthService.getUser();

</script>

<style scoped>

</style>
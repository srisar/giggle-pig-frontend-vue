<template>


  <DrawerBase>

    <ul class="p-0 px-4 menu menu-compact">
      <li class="menu-title uppercase">
        <span>Pages</span>
      </li>
      <li>
        <router-link to="/about" class="flex gap-4 uppercase">
          <InformationCircleIcon class="flex-none w-5 h-5"/>
          <span class="flex-1">About Giggle Pig</span>
        </router-link>
      </li>
    </ul>

    <ul class="p-0 px-4 menu menu-compact">
      <li></li>
      <li class="menu-title uppercase">
        <span>Users</span>
      </li>


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

    </ul>

  </DrawerBase>


</template>

<script setup>
import DrawerBase from '@/components/drawers/DrawerBase.vue';
import AuthService from '@/services/authService.js';
import {InformationCircleIcon, UsersIcon, UserIcon} from '@heroicons/vue/solid';

/** @type{User} */
const user = AuthService.getUser();

</script>

<style scoped>

</style>
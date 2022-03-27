<template>

  <div class="navbar bg-base-300 mb-5" v-if="state.loggedInUser">
    <!-- mobile screen menu -->
    <div class="navbar-start">
      <label for="my-drawer" class="btn drawer-button lg:hidden">
        <MenuAlt1Icon class="w-6 h-6"/>
      </label>

      <router-link to="/" class="btn btn-ghost normal-case text-xl">
        <img :src="appIcon" alt="" class="w-10 h-10">
      </router-link>
    </div>

    <!-- large screen menu -->
    <div class="navbar-center hidden lg:flex z-50">

    </div>
    <!-- right side -->
    <div class="navbar-end">
      <div class="dropdown dropdown-end">
        <label tabindex="0" class="btn btn-ghost m-1 gap-2">
          <span class="hidden lg:inline">{{ state.loggedInUser.full_name }}</span>
          <span><UserCircleIcon class="w-8 h-8"/></span>
        </label>

        <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-200 rounded-box w-52">
          <li v-if="state.loggedInUser.isAdmin()">
            <router-link :to="{name:'manageUsers'}">
              <UsersIcon class="w-4 h-4"/>
              Manage Users
            </router-link>
          </li>
          <li>
            <router-link :to="{name:'manageMe'}">
              <UserIcon class="w-4 h-4"/>
              <div>Manage Me</div>
            </router-link>
          </li>
          <li>
            <router-link to="/logout">
              <LogoutIcon class="w-4 h-4"/>
              Logout
            </router-link>
          </li>
        </ul>

      </div>

    </div>
  </div>

</template>

<script setup>
import {onMounted, reactive} from 'vue';
import AuthService from '../services/authService.js';
import appIcon from '../assets/app-icon.svg';
import {LogoutIcon, UserIcon, UserCircleIcon, UsersIcon, MenuAlt1Icon} from '@heroicons/vue/solid';


const state = reactive({
  /** @type{User} */
  loggedInUser: null,
});

onMounted(async () => {

  try {
    state.loggedInUser = AuthService.getUser();
  } catch (e) {
    console.log(e);
  }

});


</script>

<style scoped>

</style>
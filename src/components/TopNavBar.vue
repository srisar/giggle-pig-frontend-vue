<template>

  <div class="navbar bg-primary">
    <!-- mobile screen menu -->
    <div class="navbar-start">
      <div class="dropdown">
        <label tabindex="0" class="btn btn-ghost lg:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16"/>
          </svg>
        </label>
        <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
          <li><a>Item 1</a></li>
          <li tabindex="0">
            <a class="justify-between">
              Parent
              <IconDownArrow/>
            </a>
            <ul class="p-2">
              <li><a>Submenu 1</a></li>
              <li><a>Submenu 2</a></li>
            </ul>
          </li>
          <li><a>Item 3</a></li>
        </ul>
      </div>
      <a class="btn btn-ghost normal-case text-xl">Giggle Pig</a>
    </div>

    <!-- large screen menu -->
    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal p-0">
        <li><a>Item 1</a></li>
        <li tabindex="0">
          <a>
            Parent
            <IconDownArrow/>
          </a>
          <ul class="p-2">
            <li><a>Submenu 1</a></li>
            <li><a>Submenu 2</a></li>
          </ul>
        </li>
        <li><a>Item 3</a></li>
      </ul>
    </div>
    <div class="navbar-end">
      <div class="dropdown dropdown-end">
        <label tabindex="0" class="btn m-1 gap-2">
          <span>{{ state.loggedInUser.username }}</span>
          <span><IconUser class-name="w-6 h-6"/></span>
        </label>
        <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
          <li>
            <button>Manage</button>
            <router-link to="/logout">Logout</router-link>
          </li>
        </ul>
      </div>

    </div>
  </div>

</template>

<script setup>
import IconUser from '../components/icons/IconUser.vue';
import {onMounted, reactive} from 'vue';
import AuthService from '../services/authService.js';
import IconDocumentation from './icons/IconDocumentation.vue';
import IconDownArrow from './icons/IconDownArrow.vue';
import {useRouter} from 'vue-router';

const router = useRouter();

const state = reactive({
  loggedInUser: '',
});

onMounted(async () => {

  try {
    state.loggedInUser = await AuthService.getUser();
  } catch (e) {
    console.log(e);
  }

});



</script>

<style scoped>

</style>
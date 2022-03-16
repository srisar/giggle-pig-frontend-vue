<script setup>

import {onMounted} from 'vue';
import AuthService from '../services/authService.js';

onMounted(async () => {

  // if (await AuthService.isLoggedIn()) {
  //   console.log('logged in');
  // } else {
  //   console.log('not logged in');
  // }

});

</script>

<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>

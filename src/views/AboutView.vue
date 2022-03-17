<script setup>

import {onMounted} from 'vue';
import AuthService from '../services/authService.js';
import TopNavBar from '../components/TopNavBar.vue';

onMounted(async () => {
});

</script>

<template>
  <main>
    <TopNavBar/>
  </main>
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

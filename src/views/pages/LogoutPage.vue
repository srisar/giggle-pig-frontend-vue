<template>
  <h1 class="text-center">Logging out...</h1>
</template>

<script setup>

import {onMounted} from 'vue';
import AuthService from '../../services/authService.js';
import {useRouter} from 'vue-router';

const router = useRouter();

onMounted(() => {

  AuthService.logout();
  router.push('/');

});

</script>

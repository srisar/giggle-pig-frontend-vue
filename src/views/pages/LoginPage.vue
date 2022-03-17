<template>

  <div class="container mx-auto mt-28 flex justify-center">

    <div class="card bg-neutral lg:w-1/3">
      <div class="card-body">

        <div class="card-title justify-center">GigglePig SPA</div>

        <div class="grid-cols-2">
          <div>
            <div class="form-control w-full">
              <label class="label">
                <span class="label-text">Username</span>
              </label>
              <input type="text" class="input input-bordered w-full" v-model="state.username">
            </div>
          </div>
          <div>
            <div class="form-control w-full">
              <label class="label">
                <span class="label-text">Password</span>
              </label>
              <input type="password" class="input input-bordered w-full" v-model="state.password">
            </div>
          </div>
        </div>

        <div class="flex justify-center">
          <button class="btn btn-primary" @click="handleLogin">Login</button>
        </div>

      </div>
    </div>

  </div>

</template>

<script setup>

import {onMounted, reactive} from 'vue';
import {useRouter} from 'vue-router';
import AuthService from '../../services/authService.js';

const router = useRouter();

const state = reactive({
  username: 'admin',
  password: 'admin',
});

onMounted(async () => {


});


async function handleLogin() {
  try {

    await AuthService.login(state.username, state.password);
    await router.push('/');

  } catch (e) {
    console.log(e);
  }
}


</script>

<style scoped>

</style>
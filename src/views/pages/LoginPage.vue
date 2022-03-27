<template>

  <main class="h-full container">
    <section class="mx-2 flex flex-col gap-5 justify-center items-center h-full">

      <AlertContainer type="warning" class="md:w-1/3" v-if="errors.queryErrors.hasError">
        {{ errors.queryErrors.message }}
      </AlertContainer>

      <CardContainer class="md:w-1/2 lg:w-1/3">

        <template v-slot:title>
          <div class="flex flex-col gap-5">
            <div>Giggle Pig</div>
            <img :src="logo" class="w-24 justify-center flex" alt="">
          </div>
        </template>

        <form @submit.prevent="handleLogin">
          <TextInput
              label="Username"
              :input-class="{'input-error': errors.formError.hasErrors}"
              v-model="data.username"
          />
          <TextInput
              label="Password"
              type="password"
              :input-class="{'input-error': errors.formError.hasErrors}"
              v-model="data.password"
          />

          <div class="flex justify-center mt-5">
            <button class="btn btn-primary w-full" @click="handleLogin">Login</button>
          </div>
        </form>

        <template v-slot:footer>
          <AlertContainer type="error" v-if="errors.formError.hasErrors">
            {{ errors.formError.message }}
          </AlertContainer>
        </template>

      </CardContainer>


    </section>
  </main>

</template>

<script setup>

import {onMounted, reactive} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import CardContainer from '@/components/CardContainer.vue';
import AlertContainer from '@/components/form/AlertContainer.vue';
import TextInput from '@/components/form/TextInput.vue';
import AuthService from '@/services/authService.js';
import logo from '@/assets/app-icon.svg';

const router = useRouter();
const route = useRoute();

const data = reactive({
  username: 'admin',
  password: 'admin',
});

const errors = reactive({
  formError: {
    hasErrors: false,
    message: ''
  },
  queryErrors: {
    hasError: false,
    message: '',
  },

  debugError: '',

});

onMounted(async () => {

  if (route.query['message']) {
    errors.queryErrors.hasError = true;
    errors.queryErrors.message = route.query['message'];
  }

});


async function handleLogin() {
  try {

    await AuthService.login(data.username, data.password);
    redirectIfExists();

  } catch (e) {
    errors.debugError = e;
    errors.formError.hasErrors = true;
    errors.formError.message = e.response.data.payload['error'];
  }
}


function redirectIfExists() {
  if (route.query.hasOwnProperty('redirect')) {
    router.push(route.query.redirect);
  } else {
    router.push('/');
  }
}


</script>

<style scoped>

</style>
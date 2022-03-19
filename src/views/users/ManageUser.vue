<template>

  <section class="container mx-auto flex justify-center" v-if="state.user">

    <div class="card w-full lg:w-1/2 bg-base-300 shadow-xl mx-2">
      <div class="card-body">

        <h2 class="card-title">{{ state.fullName }}</h2>

        <div>

          <div class="form-control w-full mb-3">
            <label class="label">
              <span class="label-text">Username</span>
            </label>
            <input type="text" class="input input-bordered w-full" v-model="state.user.username">
          </div>

          <div class="form-control w-full mb-3">
            <label class="label">
              <span class="label-text">Full name</span>
            </label>
            <input type="text" class="input input-bordered w-full" v-model="state.user.full_name">
          </div>

        </div>


        <div class="card-actions justify-end">
          <button class="btn btn-primary">Update</button>
          <button class="btn btn-secondary">Cancel</button>
        </div>
      </div>
    </div>

  </section>

</template>

<script setup>

import {onMounted, reactive} from 'vue';
import AuthService from '../../services/authService.js';
import {useUserAPI} from '../../composibles/useUserAPI.js';
import {User} from '../../models/user.js';

const {useUserState, fetchUser} = useUserAPI();

const state = reactive({
  /**
   * @type {User|null}
   */
  user: null,
  fullName: '',
});

onMounted(async () => {

  try {

    const _user = await AuthService.getUser();

    await fetchUser(_user.id);


    state.user = useUserState.currentUser;
    state.fullName = useUserState.currentUser.full_name;


  } catch (e) {
    console.log(e);
  }


});


</script>

<style scoped>

</style>
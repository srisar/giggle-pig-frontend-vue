<template>

  <section class="container mx-auto" v-if="state.user">

    <section class="flex justify-center">
      <!-- card: update details -->
      <div class="mx-2 mb-10 w-full shadow-xl card lg:w-1/2 bg-base-300">
        <div class="card-body">

          <h2 class="justify-center card-title">{{ state.fullName }} Details</h2>

          <div>

            <div class="mb-3 w-full form-control">
              <label class="label">
                <span class="label-text">Full name</span>
              </label>
              <input type="text" class="w-full input input-bordered" v-model="state.user.full_name">
            </div>

            <div class="grid grid-cols-2 gap-5">
              <div class="mb-3 w-full form-control">
                <label class="label">
                  <span class="label-text">Username</span>
                </label>
                <input type="text" class="w-full input input-bordered" v-model="state.user.username">
              </div>

              <div class="mb-3 w-full form-control">
                <label class="label">
                  <span class="label-text">Email</span>
                </label>
                <input type="text" class="w-full input input-bordered" v-model="state.user.email">
              </div>
            </div>


          </div>


          <div class="justify-end card-actions">
            <button class="btn btn-primary" @click="handleUpdate" :disabled="!isFormValidated">
              {{ state.updateButtonLabel }}
            </button>
            <button class="btn btn-secondary">Cancel</button>
          </div>

        </div>
      </div> <!-- end: details -->
    </section>


    <!-- section: change password -->
    <section class="flex flex-col justify-center items-center">

      <div class="mb-5">
        <button class="btn btn-error btn-xs" v-if="!state.showChangePasswordArea"
                @click="state.showChangePasswordArea = !state.showChangePasswordArea">
          Update password
        </button>
      </div>

      <div class="mx-2 w-full shadow-xl lg:w-1/2 bg-base-300 card" v-if="state.showChangePasswordArea">
        <div class="card-body">

          <header class="justify-center card-title">Update Password</header>

          <main class="grid grid-cols-2 gap-5">

            <div class="mb-3 w-full form-control">
              <label class="label">
                <span class="label-text">New password</span>
              </label>
              <input type="password" class="w-full input input-bordered" v-model="state.password.newPassword">
            </div>

            <div class="mb-3 w-full form-control">
              <label class="label">
                <span class="label-text">Confirm password</span>
              </label>
              <input type="password" class="w-full input input-bordered" v-model="state.password.confirmNewPassword">
            </div>

          </main>

          <footer class="card-actions justify-end">
            <button class="btn btn-primary" :disabled="!isPasswordValidated">Update password</button>
            <button class="btn btn-secondary" @click="state.showChangePasswordArea = false">
              Cancel
            </button>
          </footer>


        </div>
      </div><!-- card -->

    </section> <!-- section: change password -->


  </section><!-- container -->

</template>

<script setup>

import {computed, onMounted, reactive} from 'vue';
import AuthService from '../../services/authService.js';
import {useUserAPI} from '../../composables/useUserAPI.js';
import {User} from '../../models/user.js';
import {isEmpty} from 'lodash';

const {fetchUser, updateUser} = useUserAPI();

const state = reactive({
  /** @type{User} */
  user: undefined,

  fullName: '',

  showUpdatePasswordArea: false,
  password: {
    newPassword: '',
    confirmNewPassword: '',
  },

  updateButtonLabel: 'Update',
});

const isFormValidated = computed(() => {
  return !isEmpty(state.user.full_name) && !isEmpty(state.user.username);
});

const isPasswordValidated = computed(() => {
  if (isEmpty(state.password.newPassword)) {
    return false;
  }
  return state.password.newPassword === state.password.confirmNewPassword;
});


onMounted(async () => {
  try {

    const _user = await AuthService.getUser();

    state.user = await fetchUser(_user.id);
    state.fullName = state.user.full_name;

  } catch (e) {
    console.log(e);
  }
});


async function handleUpdate() {
  try {

    state.updateButtonLabel = 'Updating...';
    await updateUser(state.user);

    state.updateButtonLabel = 'Updated!';

    setTimeout(() => {
      state.updateButtonLabel = 'Update';
    }, 3000);

  } catch (e) {
    console.log(e);
  }
}


</script>

<style scoped>

</style>
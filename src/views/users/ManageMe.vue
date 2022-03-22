<template>

  <section class="mx-2" v-if="state.user">

    <section class="flex justify-center">
      <!-- card: update details -->
      <div class="mb-10 w-full shadow-xl card lg:w-1/2 bg-base-300">
        <div class="card-body">

          <header class="justify-center card-title">{{ state.fullName }} Details</header>

          <main>

            <div class="mb-3 w-full form-control">
              <label class="label">
                <span class="label-text">Full name</span>
              </label>
              <input type="text" class="w-full input input-bordered" v-model="state.user.full_name">
            </div>

            <div class="grid md:grid-cols-2 md:gap-3">
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


          </main>


          <footer class="justify-end card-actions">
            <button class="btn btn-primary" @click="handleUpdate" :disabled="!isFormValidated">
              {{ state.updateButtonLabel }}
            </button>
            <button class="btn btn-secondary">Cancel</button>
          </footer>

        </div>
      </div> <!-- end: details -->
    </section>


    <!-- section: change password -->
    <section class="flex flex-col justify-center items-center mx-2">

      <div class="mb-5">
        <button class="btn btn-error btn-xs" v-if="!state.showChangePasswordArea"
                @click="state.showChangePasswordArea = !state.showChangePasswordArea">
          Update password
        </button>
      </div>

      <div class="mx-2 w-full shadow-xl lg:w-1/2 bg-base-300 card" v-if="state.showChangePasswordArea">

        <section class="card-body">

          <header class="justify-center card-title">Update Password</header>

          <main class="grid md:gap-3 lg:grid-cols-2">

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

          <footer class="justify-end card-actions">
            <button class="btn btn-primary" :disabled="!isPasswordValidated" @click="state.modalVisible = true">
              Update password
            </button>
            <button class="btn btn-secondary" @click="state.showChangePasswordArea = false">
              Cancel
            </button>
          </footer>

          <div class="" v-if="state.passwordUpdateResponse.visible">
            <p class="text-success" v-if="state.passwordUpdateResponse.success">{{ state.passwordUpdateResponse.message }}</p>
            <p class="text-error" v-else>{{ state.passwordUpdateResponse.message }}</p>
          </div>


        </section>
      </div><!-- card -->

    </section> <!-- section: change password -->


  </section><!-- container -->

  <ModalWindow id="mdl-upd" :visible="state.modalVisible" @closed="state.modalVisible = false">
    <template v-slot:header>Confirm updating password</template>
    <template v-slot:main>
      <p>Updating password is an irreversible operation. Are you sure do you want to continue?</p>
    </template>
    <template v-slot:footer>
      <button class="btn btn-sm btn-primary" @click="handlePasswordUpdate">Yes, Update</button>
      <button class="btn btn-sm btn-secondary" @click="state.modalVisible = false">Cancel</button>
    </template>
  </ModalWindow>

</template>

<script setup>

import {computed, onMounted, reactive} from 'vue';
import AuthService from '../../services/authService.js';
import {useUserAPI} from '../../composables/useUserAPI.js';
import {User} from '../../models/user.js';
import {isEmpty} from 'lodash';
import ModalWindow from '../../components/ModalWindow.vue';

const {fetchUser, updateUser, updatePassword} = useUserAPI();

const state = reactive({
  /** @type{User} */
  user: undefined,

  fullName: '',
  updateButtonLabel: 'Update',

  /* password update data */
  modalVisible: false,
  showUpdatePasswordArea: false,
  password: {
    newPassword: '',
    confirmNewPassword: '',
  },
  passwordUpdateResponse: {
    visible: false,
    success: false,
    message: 'Password updated'
  }

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


/**
 * EH: Update general details button
 */
async function handleUpdate() {
  try {

    state.updateButtonLabel = 'Updating...';
    await updateUser(state.user);

    await AuthService.updateUser();

    state.updateButtonLabel = 'Updated!';

    setTimeout(() => {
      state.updateButtonLabel = 'Update';
    }, 3000);

  } catch (e) {
    console.log(e);
  }
}

async function handlePasswordUpdate() {
  try {

    await updatePassword(state.user.id, state.password.newPassword);
    state.modalVisible = false;
    state.passwordUpdateResponse.visible = true;
    state.passwordUpdateResponse.success = true;
    state.passwordUpdateResponse.message = 'Password updated successfully';


  } catch (e) {
    console.log('e');
    state.modalVisible = false;
    state.passwordUpdateResponse.visible = true;
    state.passwordUpdateResponse.success = false;
    state.passwordUpdateResponse.message = 'Password update failed';
  }
}


</script>

<style scoped>

</style>
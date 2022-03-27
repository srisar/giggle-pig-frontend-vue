<template>

  <section class="mx-2" v-if="data.user">

    <section class="flex justify-center mb-5">

      <CardContainer class="md:w-1/2">
        <template v-slot:title>{{ data.fullName }} Details</template>
        <main>

          <TextInput label="Full name" v-model="data.user.full_name"/>

          <div class="grid md:grid-cols-2 md:gap-3">
            <TextInput label="Username" v-model="data.user.username"/>
            <TextInput label="Email" v-model="data.user.email"/>
          </div>

        </main>

        <template v-slot:footer>
          <button class="btn btn-primary" @click="handleUpdate" :disabled="!isFormValidated">
            {{ ui.updateButton.label }}
          </button>
          <router-link :to="{name:'manageUsers'}" class="btn btn-secondary">Cancel</router-link>
        </template><!-- footer -->

      </CardContainer>

    </section>

    <!-- section: change password -->
    <section class="flex justify-center items-center">

      <div class="mb-5">
        <button class="btn btn-sm" v-if="!ui.areaUpdatePassword.visible"
                @click="ui.areaUpdatePassword.visible = !ui.areaUpdatePassword.visible">
          Update password
        </button>
      </div>

      <CardContainer class="md:w-1/2" v-if="ui.areaUpdatePassword.visible">
        <template v-slot:title>Update Password</template>
        <main>

          <TextInput label="New password" v-model="data.password.newPassword"/>
          <TextInput label="Confirm password" v-model="data.password.confirmNewPassword"/>

        </main>

        <template v-slot:footer>
          <button class="btn btn-primary" :disabled="!isPasswordValidated" @click="ui.modalUpdatePassword.visible = true">
            Update password
          </button>
          <button class="btn btn-secondary" @click="ui.areaUpdatePassword.visible = false">
            Cancel
          </button>
        </template>

        <template v-slot:belowFooter>
          <div class="" v-if="data.passwordUpdateResponse.visible">
            <p class="text-success" v-if="data.passwordUpdateResponse.success">{{ data.passwordUpdateResponse.message }}</p>
            <p class="text-error" v-else>{{ data.passwordUpdateResponse.message }}</p>
          </div>
        </template>

      </CardContainer>

    </section> <!-- section: change password -->

  </section>


  <!-- modal: password update confirmation -->
  <ModalWindow id="mdl-upd" :visible="ui.modalUpdatePassword.visible" @closed="ui.modalUpdatePassword.visible = false">
    <template v-slot:header>Confirm updating password</template>

    <main>
      <p>Updating password is an irreversible operation. Are you sure do you want to continue?</p>
    </main>

    <template v-slot:footer>
      <button class="btn btn-sm btn-primary" @click="handlePasswordUpdate">Yes, Update</button>
      <button class="btn btn-sm btn-secondary" @click="ui.modalUpdatePassword.visible = false">Cancel</button>
    </template>
  </ModalWindow>

</template>

<script setup>

import {computed, onMounted, reactive} from 'vue';
import CardContainer from '@/components/CardContainer.vue';
import TextInput from '@/components/form/TextInput.vue';
import ModalWindow from '@/components/ModalWindow.vue';
import AuthService from '@/services/authService.js';
import UserApi from '@/api/UserApi.js';
import {User} from '@/models/user.js';
import {isEmpty} from 'lodash';


const data = reactive({
  /** @type{User} */
  user: undefined,

  fullName: '',
  updateButtonLabel: 'Update',

  password: {
    newPassword: '',
    confirmNewPassword: '',
  },
  passwordUpdateResponse: {
    visible: false,
    success: false,
    message: 'Password updated'
  },

  roles: UserApi.roles,

});

const ui = reactive({

  updateButton: {
    label: 'Update'
  },

  modalUpdatePassword: {
    visible: false,
  },
  areaUpdatePassword: {
    visible: false,
  },

});

const errors = reactive({});

/* --- */
/* Computed Properties */
/* --- */

const isFormValidated = computed(() => {
  return !isEmpty(data.user.full_name) && !isEmpty(data.user.username);
});

const isPasswordValidated = computed(() => {
  if (isEmpty(data.password.newPassword)) {
    return false;
  }
  return data.password.newPassword === data.password.confirmNewPassword;
});


/* --- */
/* Hooks */
/* --- */

onMounted(async () => {
  try {

    const _user = await AuthService.getUser();

    data.user = await UserApi.fetchUser(_user.id);
    data.fullName = data.user.full_name;

  } catch (e) {
    console.log(e);
  }
});


/* --- */
/* Event Handlers */
/* --- */


async function handleUpdate() {
  try {

    ui.updateButton.label = 'Updating...';
    await UserApi.updateUser(data.user);

    await AuthService.updateUser();

    ui.updateButton.label = 'Updated!';
    setTimeout(() => {
      ui.updateButton.label = 'Update';
    }, 3000);

  } catch (e) {
    console.log(e);
  }
}

async function handlePasswordUpdate() {
  try {

    await UserApi.updatePassword(data.user.id, data.password.newPassword);
    ui.modalUpdatePassword.visible = false;


  } catch (e) {
    console.log('e');
    ui.modalUpdatePassword.visible = false;
  }
}


</script>

<style scoped>

</style>
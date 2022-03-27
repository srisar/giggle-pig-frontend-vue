<template>

  <main class="mx-2" v-if="data.hasUser">

    <section v-if="active">

      <section id="edit_user" class="flex flex-col gap-5 justify-center items-center mb-5">

        <CardContainer class="lg:w-1/2">
          <template v-slot:title>{{ data.userToEdit.full_name }} Details</template>

          <main class="mb-3">

            <TextInput
                label="Full name"
                :input-class="{'input-error': !validFullName}"
                v-model.trim="data.userToEdit.full_name"
            />

            <div class="grid md:grid-cols-2 md:gap-3">
              <TextInput
                  label="Username"
                  :input-class="{'input-error': !validUsername}"
                  v-model.trim="data.userToEdit.username"
              />
              <TextInput
                  label="Email"
                  :input-class="{'input-error': !validEmail}"
                  v-model.trim="data.userToEdit.email"
              />
            </div>

            <DropdownInput label="Role" :options="data.roles" v-model="data.userToEdit.role"/>

          </main>

          <template v-slot:footer>
            <button class="btn btn-primary" @click="handleUpdate" :disabled="!validEditForm">
              {{ ui.buttonUpdateDetails.label }}
            </button>
            <router-link :to="{name:'manageUsers'}" class="btn btn-secondary">Cancel</router-link>
          </template>

          <template v-slot:belowFooter v-if="errors.editForm.hasErrors">
            <AlertContainer type="error">
              {{ errors.editForm.message }}
            </AlertContainer>
          </template>

        </CardContainer>

      </section><!-- edit_user -->

      <section id="update_password" class="flex flex-col justify-center items-center mb-5">

        <div class="mb-3" v-if="!ui.areaUpdatePassword.visible">
          <button class="btn btn-sm" @click="ui.areaUpdatePassword.visible = true">
            Update password
          </button>
        </div>

        <CardContainer class="md:w-1/2" v-if="ui.areaUpdatePassword.visible">
          <template v-slot:title>Update Password</template>

          <main class="mb-3">
            <TextInput label="New password" v-model="data.changePassword.newPassword"/>
            <TextInput label="Confirm password" v-model="data.changePassword.confirmNewPassword"/>
          </main>

          <template v-slot:footer>
            <button class="btn btn-primary btn-sm" :disabled="!validChangePasswordForm" @click="ui.modalConfirmUpdatePassword.visible=true">
              {{ ui.buttonUpdatePassword.label }}
            </button>
            <button class="btn btn-sm btn-secondary" @click="ui.areaUpdatePassword.visible = false">Cancel</button>
          </template><!-- footer -->


          <template v-slot:belowFooter v-if="errors.passwordForm.hasErrors">
            <AlertContainer type="error" class="mt-3">
              {{ errors.passwordForm.message }}
            </AlertContainer>
          </template>

        </CardContainer>

      </section><!-- update_password -->

    </section>

    <!-- advanced management settings -->
    <section id="advanced" class="flex flex-col gap-5 justify-center items-center">
      <CardContainer class="lg:w-1/2">

        <template v-slot:title>Advanced options</template>

        <!-- active / inactive -->
        <main class="">
          <section v-if="active">
            <h3 class="text-xl mb-3 text-primary">Deactivate user</h3>
            <p class="text-sm mb-3">Deactivating the user will keep the user record and activities intact. But the user will not
              be able to login to the system.</p>

            <div class="flex justify-center">
              <button class="btn btn-sm btn-error" @click="handleDeactivateUser">Deactivate</button>
            </div>
          </section>

          <section v-else>
            <div class="flex justify-center mb-3">
              <button class="btn btn-success" @click="handleActivateUser">Activate user</button>
            </div>
            <p class="text-sm text-accent-content">Activate the user to access user details. Deactivated users won't be able to login.</p>
          </section>

        </main>

        <div class="divider"></div>

        <section>
          <h3 class="text-xl mb-3 text-primary">Delete user</h3>
          <p class="text-sm mb-3">Delete will remove the user from the system permanently. This operation cannot be reversed.</p>

          <div class="flex justify-center">
            <button class="btn btn-sm btn-error" @click="ui.modalConfirmDelete.visible=true">Delete</button>
          </div>

        </section>

      </CardContainer>
    </section>

  </main>

  <!-- modal update password -->
  <ModalWindow id="mdl-upd" :visible="ui.modalConfirmUpdatePassword.visible" @closed="ui.modalConfirmUpdatePassword.visible = false">
    <template v-slot:header>Confirm updating password</template>

    <main>
      <p>Updating password is an irreversible operation. Are you sure do you want to continue?</p>
    </main>

    <template v-slot:footer>
      <button class="btn btn-sm btn-primary" @click="handleUpdatePassword">Yes, Update</button>
      <button class="btn btn-sm btn-secondary" @click="ui.modalConfirmUpdatePassword.visible = false">Cancel</button>
    </template>
  </ModalWindow>

  <!-- modal delete user -->
  <ModalWindow id="mdl-dl" :visible="ui.modalConfirmDelete.visible" @closed="ui.modalConfirmDelete.visible = false">
    <template v-slot:header>Confirm delete user</template>

    <main>
      <p>Delete is an irreversible operation. Are you sure do you want to continue?</p>
    </main>

    <template v-slot:footer>
      <button class="btn btn-sm btn-primary" @click="handleDeleteUser">Yes, Delete</button>
      <button class="btn btn-sm btn-secondary" @click="ui.modalConfirmDelete.visible = false">Cancel</button>
    </template>

    <template v-slot:belowFooter v-if="errors.deleteUser.hasErrors">
      <AlertContainer type="error">
        {{ errors.deleteUser.message }}
      </AlertContainer>
    </template>

  </ModalWindow>


</template>

<script setup>
import UserApi from '@/api/UserApi.js';
import {computed, onMounted, reactive, watchEffect} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import ModalWindow from '@/components/ModalWindow.vue';
import TextInput from '@/components/form/TextInput.vue';
import DropdownInput from '@/components/form/DropdownInput.vue';
import CardContainer from '@/components/CardContainer.vue';
import AlertContainer from '@/components/form/AlertContainer.vue';
import {User} from '@/models/user.js';
import {isEmpty} from 'lodash';

const route = useRoute();
const router = useRouter();


const data = reactive({
  hasUser: false,

  userToEdit: new User({}),

  fullName: '',

  changePassword: {
    newPassword: '',
    confirmNewPassword: '',
  },

  roles: UserApi.roles,

});

const ui = reactive({
  buttonUpdateDetails: {
    label: 'Update',
    disabled: false,
  },

  buttonUpdatePassword: {
    label: 'Update',
    disabled: false,
  },

  areaUpdatePassword: {
    visible: false,
  },

  modalConfirmUpdatePassword: {
    visible: false,
  },

  modalConfirmDelete: {
    visible: false,
  },

  areaDeactivate: {
    title: 'Deactivate'
  }


});

const errors = reactive({
  editForm: {
    hasErrors: false,
    message: '',
  },

  passwordForm: {
    hasErrors: false,
    message: ''
  },

  deleteUser: {
    hasErrors: false,
    message: ''
  }

});

/* --- */
/* Computed Properties */
/* --- */

const active = computed(() => {
  return data.userToEdit.status === User.STATUS_ACTIVE;
});

const validFullName = computed(() => {
  return !isEmpty(data.userToEdit.full_name);
});

const validUsername = computed(() => {
  return !isEmpty(data.userToEdit.username);
});
const validEmail = computed(() => {
  return !isEmpty(data.userToEdit.email);
});

const validEditForm = computed(() => {
  return validEmail.value && validUsername.value && validFullName.value;
});

const validChangePasswordForm = computed(() => {
  if (isEmpty(data.changePassword.newPassword)) return false;
  return data.changePassword.newPassword === data.changePassword.confirmNewPassword;
});

/* --- */
/* Watchers */
/* --- */

watchEffect(() => {
  if (!validChangePasswordForm.value) {
    errors.passwordForm.hasErrors = true;
    errors.passwordForm.message = 'Invalid password or password mismatch';
  } else {
    errors.passwordForm.hasErrors = false;
    errors.passwordForm.message = '';
  }
});


/* --- */
/* Hooks */
/* --- */

onMounted(async () => {
  try {
    data.userToEdit = await UserApi.fetchUser(parseInt(route.params['userId'].toString()));
    data.fullName = data.userToEdit.full_name;
    data.hasUser = true;
  } catch (e) {

  }
});

/* --- */
/* Event Handlers */
/* --- */

async function handleUpdate() {
  try {
    ui.buttonUpdateDetails.label = 'Updating...';
    await UserApi.updateUser(data.userToEdit);

    ui.buttonUpdateDetails.label = '✔️Updated';

    setTimeout(() => {
      ui.buttonUpdateDetails.label = 'Update';
    }, 3000);

  } catch (e) {
    ui.buttonUpdateDetails.label = 'Update';
    errors.editForm.hasErrors = true;
    errors.editForm.message = e.response.data['payload']['error'];
  }
}

async function handleUpdatePassword() {
  try {

    await UserApi.updatePassword(data.userToEdit.id, data.changePassword.newPassword);
    ui.modalConfirmUpdatePassword.visible = false;

    ui.areaUpdatePassword.visible = false;


  } catch (e) {
    console.log('e');
    ui.modalConfirmUpdatePassword.visible = false;
  }
}

async function handleActivateUser() {
  try {
    await UserApi.setAsActive(data.userToEdit);
    data.userToEdit.status = User.STATUS_ACTIVE;
  } catch (e) {
    console.log(e);
  }
}

async function handleDeactivateUser() {
  try {
    await UserApi.setAsInactive(data.userToEdit);
    data.userToEdit.status = User.STATUS_INACTIVE;
  } catch (e) {
    console.log(e);
  }
}

async function handleDeleteUser() {
  try {
    await UserApi.deleteUser(data.userToEdit);
    await router.push({name: 'manageUsers'});
  } catch (e) {
    console.log(e);
    errors.deleteUser.hasErrors = true;
    errors.deleteUser.message = e.response.data['payload']['error'];
  }
}


</script>

<style scoped>

</style>
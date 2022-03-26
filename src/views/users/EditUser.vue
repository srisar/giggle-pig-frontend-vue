<template>

  <main class="mx-2" v-if="data.hasUser">

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

          <DropdownInput label="Role" :options="roles" v-model="data.userToEdit.role"/>

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

  </main>

  <ModalWindow id="mdl-upd" :visible="ui.modalConfirmUpdatePassword.visible" @closed="ui.modalConfirmUpdatePassword.visible = false">
    <template v-slot:header>Confirm updating password</template>
    <template v-slot:main>
      <p>Updating password is an irreversible operation. Are you sure do you want to continue?</p>
    </template>
    <template v-slot:footer>
      <button class="btn btn-sm btn-primary" @click="handleUpdatePassword">Yes, Update</button>
      <button class="btn btn-sm btn-secondary" @click="ui.modalConfirmUpdatePassword.visible = false">Cancel</button>
    </template>
  </ModalWindow>

</template>

<script setup>
import ModalWindow from '@/components/ModalWindow.vue';
import {computed, onMounted, reactive, watchEffect} from 'vue';
import {useRoute} from 'vue-router';
import TextInput from '@/components/form/TextInput.vue';
import DropdownInput from '@/components/form/DropdownInput.vue';
import CardContainer from '@/components/CardContainer.vue';
import AlertContainer from '@/components/form/AlertContainer.vue';
import {useUserAPI} from '@/composables/useUserAPI.js';
import {User} from '@/models/user.js';
import {isEmpty} from 'lodash';

const route = useRoute();
const {fetchUser, updateUser, roles, updatePassword} = useUserAPI();


const data = reactive({
  hasUser: false,
  /** @type{User} */
  userToEdit: new User({}),
  fullName: '',

  changePassword: {
    newPassword: '',
    confirmNewPassword: '',
  }

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
  }
});

/* --- */
/* Computed Properties */
/* --- */

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
    data.userToEdit = await fetchUser(parseInt(route.params['userId'].toString()));
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
    await updateUser(data.userToEdit);

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

    await updatePassword(data.userToEdit.id, data.changePassword.newPassword);
    ui.modalConfirmUpdatePassword.visible = false;

    ui.areaUpdatePassword.visible = false;


  } catch (e) {
    console.log('e');
    ui.modalConfirmUpdatePassword.visible = false;
  }
}


</script>

<style scoped>

</style>
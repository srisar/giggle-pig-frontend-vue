<template>

  <main>

    <!-- add user -->
    <ModalWindow id="mdl-add-user" :visible="ui.isAddUserModalVisible" @closed="handleCancelAddUser">
      <template v-slot:header>Add new user</template>

      <main v-if="data.newUser">

        <TextInput class="mb-3" label="Full name" v-model="data.newUser.full_name"/>

        <section class="grid lg:grid-cols-2 lg:gap-3 mb-3">

          <TextInput label="Username" v-model="data.newUser.username"/>
          <TextInput label="Email" v-model="data.newUser.email"/>

        </section>

        <section class="grid lg:grid-cols-2 lg:gap-3 mb-3">
          <DropdownInput label="Role" :options="roles" v-model="data.newUser.role"/>
        </section>

        <!-- password -->
        <section class="grid lg:grid-cols-2 lg:gap-3">

          <TextInput label="Password" type="password" v-model="data.newUser.password"/>
          <TextInput label="Confirm password" type="password" v-model="data.newUser.confirm_password"/>

        </section><!-- password -->

      </main>

      <template v-slot:footer>

        <footer class="card-actions justify-end">
          <button class="btn btn-primary" :disabled="!validPassword || !validAddNewUserForm" @click="handleAddUser">Save</button>
          <button class="btn btn-secondary" @click="handleCancelAddUser">Cancel</button>
        </footer>

      </template><!-- footer -->

      <template v-slot:belowFooter>

        <AlertContainer type="warning" class="mb-3" v-if="!validAddNewUserForm">
          Required fields are missing.
        </AlertContainer>

        <AlertContainer type="warning" class="mb-3" v-if="!validPassword">
          Password is empty or does not match
        </AlertContainer>

        <AlertContainer type="error" v-if="errors.addUserError.hasError">
          {{ errors.addUserError.message }}
        </AlertContainer>

      </template><!-- belowFooter -->

    </ModalWindow>


    <!-- list users -->
    <section class="flex justify-center mx-2">

      <CardContainer>

        <section class="mb-3">
          <button class="btn btn-sm btn-accent" @click="ui.isAddUserModalVisible = true">
            <UserAddIcon class="w-5 h-5 mr-1"/>
            Add User
          </button>
        </section>

        <main>

          <div class="overflow-x-auto">
            <table class="table table-zebra w-full">
              <thead>
              <tr>
                <th>Full name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="user in data.users">
                <td v-if="data.currentUser && user.id === data.currentUser.id">
                  <router-link class="link link-primary" :to="{name:'manageMe'}">
                    {{ user.full_name }}
                  </router-link>
                </td>
                <td v-else>
                  <router-link class="link link-primary" :to="{name:'editUser', params:{userId: user.id}}">
                    {{ user.full_name }}
                  </router-link>
                </td>
                <td>{{ user.username }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.role }}</td>
              </tr>
              </tbody>
            </table>
          </div>

        </main>

      </CardContainer>


    </section><!-- end list users -->

  </main>

</template>

<script setup>

import DropdownInput from '@/components/form/DropdownInput.vue';
import TextInput from '@/components/form/TextInput.vue';
import AuthService from '@/services/authService.js';
import {computed, onBeforeMount, onMounted, reactive} from 'vue';
import CardContainer from '@/components/CardContainer.vue';
import AlertContainer from '@/components/form/AlertContainer.vue';
import ModalWindow from '@/components/ModalWindow.vue';
import {UserAddIcon} from '@heroicons/vue/solid';
import {useUserAPI} from '@/composables/useUserAPI.js';
import {User} from '@/models/user.js';
import {isEmpty} from 'lodash';

const {roles, createUser, fetchUsers} = useUserAPI();

const data = reactive({
  /** @type {User[]} */
  users: [],
  /** @type {User|null} */
  currentUser: null,
  /** @type {User|null} */
  newUser: null,
});

const errors = reactive({
  addUserError: {
    hasError: false,
    message: ''
  },
});

const ui = reactive({
  isAddUserModalVisible: false,
});

/* --- */
/* Computed Props */
/* --- */

const validPassword = computed(() => {

  if (isEmpty(data.newUser.password)) {
    return false;
  } else {
    return data.newUser.password === data.newUser.confirm_password;
  }
});

const validAddNewUserForm = computed(() => {
  return (
      !isEmpty(data.newUser.full_name) &&
      !isEmpty(data.newUser.username) &&
      !isEmpty(data.newUser.email)
  );
});

/* --- */
/* Hooks */
/* --- */

onBeforeMount(() => {
  data.newUser = new User({});
});

onMounted(async () => {

  /* fetch all the users from api */
  try {
    data.users = await fetchUsers();
  } catch (e) {
    console.log(e);
  }

  /* get the current signed-in user */
  try {
    data.currentUser = await AuthService.getUser();
  } catch (e) {
    console.log(e);
  }

});


/* --- */
/* Event Handlers */
/* --- */

function handleCancelAddUser() {
  /* 1. reset form data */
  data.newUser.full_name = '';
  data.newUser.username = '';
  data.newUser.email = '';
  data.newUser.role = User.ROLE_USER;
  data.newUser.password = '';
  data.newUser.confirm_password = '';

  /* 2. close the modal */
  ui.isAddUserModalVisible = false;

  /* 3. clear all error messages */
  errors.addUserError.message = '';
  errors.addUserError.hasError = false;

}

async function handleAddUser() {
  try {

    await createUser(data.newUser);

    try {
      data.users = await fetchUsers();
    } catch (e) {
      console.log(e);
    }

    ui.isAddUserModalVisible = false;

  } catch (e) {
    errors.addUserError.hasError = true;
    errors.addUserError.message = e.response.data['payload']['error'];

    console.log(errors.addUserError);

  }
}


</script>

<style scoped>

</style>
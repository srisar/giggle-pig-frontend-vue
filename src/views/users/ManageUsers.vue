<template>

  <!-- add user -->
  <ModalWindow id="mdl-add-user" :visible="ui.isAddUserModalVisible" @closed="handleCancelAddUser">
    <template v-slot:header>Add new user</template>

    <template v-slot:main>
      <div class="form-control">
        <label class="label">
          <span class="label-text">Full name</span>
        </label>
        <input type="text" class="input input-bordered" v-model.trim="data.userToAdd.full_name">
      </div>

      <section class="grid lg:grid-cols-2 lg:gap-3 mb-5">

        <div class="form-control">
          <label class="label">
            <span class="label-text">Username</span>
          </label>
          <input type="text" class="input input-bordered" v-model.trim="data.userToAdd.username">
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Email</span>
          </label>
          <input type="text" class="input input-bordered" v-model.trim="data.userToAdd.email">
        </div>

      </section>

      <section class="grid lg:grid-cols-2 lg:gap-3 mb-5">
        <div class="form-control">
          <label class="label">
            <span class="label-text">Role</span>
          </label>
          <select class="select select-bordered w-full max-w-xs" v-model="data.userToAdd.role">
            <option disabled selected :value="null">CHOOSE ONE</option>
            <option v-for="(item, key) in roles" :value="key">{{ item }}</option>
          </select>
        </div>
      </section>

      <!-- password -->
      <section class="grid lg:grid-cols-2 lg:gap-3">
        <div class="form-control">
          <label class="label">
            <span class="label-text">Password</span>
          </label>
          <input type="password" class="input input-bordered" v-model.trim="data.userToAdd.password">
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text">Confirm password</span>
          </label>
          <input type="password" class="input input-bordered" v-model="data.userToAdd.confirm_password">
        </div>
      </section><!-- password -->

    </template>

    <template v-slot:footer>

      <footer class="card-actions justify-end">
        <button class="btn btn-primary" :disabled="!isPasswordValidated" @click="handleAddUser">Save</button>
        <button class="btn btn-secondary" @click="handleCancelAddUser">Cancel</button>
      </footer>

    </template><!-- footer -->

    <template v-slot:belowFooter>

      <AlertContainer type="warning" v-if="!isPasswordValidated">
        Password is empty or does not match
      </AlertContainer>

      <AlertContainer type="error" v-if="errors.addUserError.hasError">
        {{ errors.addUserError.message }}
      </AlertContainer>

    </template><!-- belowFooter -->

  </ModalWindow>


  <!-- list users -->
  <main class="flex justify-center mx-2">

    <CardContainer>

      <section class="mb-3">
        <button class="btn btn-sm btn-accent" @click="ui.isAddUserModalVisible = true">
          <UserAddIcon class="w-5 h-5"/>
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
              <td>
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


  </main><!-- end list users -->

</template>

<script setup>

import {computed, onMounted, reactive} from 'vue';
import CardContainer from '@/components/CardContainer.vue';
import AlertContainer from '@/components/form/AlertContainer.vue';
import ModalWindow from '@/components/ModalWindow.vue';
import {UserAddIcon} from '@heroicons/vue/solid';
import {User} from '@/models/user.js';
import {useUserAPI} from '@/composables/useUserAPI.js';
import {isEmpty} from 'lodash';

const {roles, createUser, fetchUsers} = useUserAPI();

const data = reactive({
  /** @type{User} */
  userToAdd: new User({}),
  users: [],
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


const isPasswordValidated = computed(() => {
  if (isEmpty(data.userToAdd.password)) {
    return false;
  } else {
    return data.userToAdd.password === data.userToAdd.confirm_password;
  }
});

const isAddUserFormValidated = computed(() => {

});

onMounted(async () => {
  try {
    data.users = await fetchUsers();
  } catch (e) {

  }
});


/* EVENT HANDLERS */
function handleCancelAddUser() {
  /* 1. reset form data */
  data.userToAdd.full_name = '';
  data.userToAdd.username = '';
  data.userToAdd.email = '';
  data.userToAdd.password = '';
  data.userToAdd.confirm_password = '';
  data.userToAdd.role = 'USER';

  /* 2. close the modal */
  ui.isAddUserModalVisible = false;

  /* 3. clear all error messages */
  errors.addUserError.message = '';
  errors.addUserError.hasError = false;

}

async function handleAddUser() {
  try {

    await createUser(data.userToAdd);

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
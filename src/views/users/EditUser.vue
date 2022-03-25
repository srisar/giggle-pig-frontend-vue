<template>

  <main class="mx-2" v-if="data.hasUser">

    <!-- edit user -->
    <section class="flex flex-col gap-5 items-center justify-center">

      <CardContainer class="lg:w-1/2">
        <template v-slot:title>{{ data.userToEdit.full_name }} Details</template>

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


        <template v-slot:footer>
          <button class="btn btn-primary" @click="handleUpdate" :disabled="!validEditForm">
            {{ ui.updateButton.label }}
          </button>
          <router-link :to="{name:'manageUsers'}" class="btn btn-secondary">Cancel</router-link>
        </template>

        <template v-slot:belowFooter v-if="errors.editForm.hasErrors">
          <AlertContainer type="error">
            {{ errors.editForm.message }}
          </AlertContainer>
        </template>

      </CardContainer>

    </section>

  </main>

</template>

<script setup>
import {computed, onMounted, reactive} from 'vue';
import {useRoute} from 'vue-router';
import TextInput from '@/components/form/TextInput.vue';
import DropdownInput from '@/components/form/DropdownInput.vue';
import CardContainer from '@/components/CardContainer.vue';
import AlertContainer from '@/components/form/AlertContainer.vue';
import {useUserAPI} from '@/composables/useUserAPI.js';
import {User} from '@/models/user.js';
import {isEmpty} from 'lodash';

const route = useRoute();
const {fetchUser, updateUser, roles} = useUserAPI();


const data = reactive({
  hasUser: false,
  /** @type{User} */
  userToEdit: new User({}),
  fullName: '',
});

const ui = reactive({
  updateButton: {
    label: 'Update'
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


onMounted(async () => {
  try {
    data.userToEdit = await fetchUser(parseInt(route.params['userId'].toString()));
    data.fullName = data.userToEdit.full_name;
    data.hasUser = true;
  } catch (e) {

  }
});


async function handleUpdate() {
  try {
    ui.updateButton.label = 'Updating...';
    await updateUser(data.userToEdit);

    ui.updateButton.label = '✔️Updated';

    setTimeout(() => {
      ui.updateButton.label = 'Update';
    }, 3000);

  } catch (e) {
    ui.updateButton.label = 'Update';
    errors.editForm.hasErrors = true;
    errors.editForm.message = e.response.data['payload']['error'];
  }
}

</script>

<style scoped>

</style>
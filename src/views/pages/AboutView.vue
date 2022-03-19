<template>
  <main>
    <section class="container mx-auto">

      <header class="text-center mb-5">
        <div class="w-48 mx-auto">
          <img :src="appIcon" alt="Giggle Pig Rocks!">
        </div>
      </header>

      <section class="w-3/4 mx-auto">

        <div class="mb-5">
          <h2 class="text-3xl font-bold mb-5">Introduction</h2>
          <p>
            Giggle Pig is a stateless API / SPA-based framework that utilizes PHP/MySQL for the backend and Vue3 for the
            frontend. Historically, the previous version of the Giggle Pig was written as a monolithic PHP-based framework
            that used Vue to render the templates – like Laravel’s way of doing it.
          </p>
          <p>
            Developing monolithic applications have their ups and downs. Since recently I have switched to
            micro-services-based development, I have decided to rewrite my Giggle Pig in terms of backend service and
            frontend SPA. Clearly decoupling them in a way that allows quicker development.
          </p>
          <p>
            The main intention of the Giggle Pig is to help fresh devs and students to study how PHP-based backend can be
            used with a SPA that includes authentication, authorization, and handling various API requests.
          </p>
        </div>

        <div class="mb-5">
          <h2 class="text-3xl font-bold mb-5">Communication between backend and frontend</h2>

          <p>
            JSON Web Token (JWT) is used to securely communicate between the backend and frontend. Utilizing the html5
            local storage capabilities, the token and logged-in user are managed in the SPA.
          </p>
          <p>
            On the PHP side, firebase/JWT is used to generate and validate the tokens.
          </p>
        </div>

        <div class="mb-5">
          <h2 class="text-3xl font-bold mb-5">Service-based architecture on the frontend</h2>

          <p>
            To make the development easier, each individual resource is handled by a class-based service model. For
            example, authentication is handled by authService and Axios requests are handled by axiosService, and so on.
          </p>
        </div>

        <div>
          <h2 class="text-3xl font-bold mb-5">Object-oriented architecture on the backend</h2>

          <p>
            The PHP-based backend uses model classes to map entities from the database tables. It also uses class-based
            service models to access and utilize request handling, authentication, JSON processing, and so on.
          </p>

          <p>
            Image uploading and processing is also written in OOP to make life easier.
          </p>
        </div>

      </section>

    </section>

  </main>
</template>

<script setup>
import {onMounted} from 'vue';
import TopNavBar from '../../components/TopNavBar.vue';
import appIcon from '../../assets/app-icon.svg';


onMounted(async () => {
});

</script>


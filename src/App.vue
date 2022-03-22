<template>


  <div class="drawer drawer-mobile h-screen w-full rounded">
    <input id="my-drawer" type="checkbox" class="drawer-toggle">
    <div class="drawer-content">
      <!-- Page content here -->


      <main class="flex flex-col h-full">
        <router-view name="TopNavBar"/>

        <section class="flex-1">
          <suspense>
            <div class="container">
              <router-view/>
            </div>
            <template #fallback>
              loading...
            </template>
          </suspense>
        </section>

        <section class="bg-base-200 py-3 mt-10">
          <footer class="container mx-auto text-center text-sm">
            <div class="mx-2">giggle pig - a framework to snort them all!</div>
          </footer>
        </section>

      </main>

    </div>


    <router-view name="Drawer"/>


  </div>


</template>

<script setup>

</script>
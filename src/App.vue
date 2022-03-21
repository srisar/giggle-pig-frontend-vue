<template>

  <main class="mb-24">
    <router-view name="TopNavBar"/>
    <section>
      <aside>
        <router-view name="Sidebar"/>
      </aside>
      <main>
        <router-view/>
      </main>
    </section>

  </main>

  <div class="bg-base-300 py-3 mt-10 fixed inset-x-0 bottom-0">
    <footer class="container mx-auto text-center text-sm">
      <div>giggle pig - a framework to snort them all! made in sri lanka with ❤</div>
    </footer>
  </div>

</template>

<script setup>

</script>
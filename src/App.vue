<script setup>
import { RouterLink, RouterView } from 'vue-router';
import Navbar from "@/components/Navbar.vue";
import Alert from "@/components/Alert.vue";
</script>

<template>
  <Navbar />
  <Alert />
  <div class="mx-2 my-2 px-3 py-4 bg-primary-900">
    <RouterView />
  </div>
</template>

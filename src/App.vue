<script setup>
import { RouterLink, RouterView } from 'vue-router';
import Navbar from "@/components/Navbar.vue";
import Alert from "@/components/Alert.vue";
</script>

<template>
  <Navbar class="mb-8" />
  <Alert class="mx-auto max-w-7xl"/>
  <div class="mx-auto max-w-7xl my-2 bg-primary">
    <RouterView />
  </div>
</template>

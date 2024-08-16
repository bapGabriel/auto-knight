<script setup>
import { useAlertStore } from '@/store';
import { storeToRefs } from 'pinia';

const alertStore = useAlertStore();
const { alert } = storeToRefs(alertStore);
</script>

<template>
<div v-if="alert" class="m-3 px-3 py-2 rounded-md flex items-center justify-between" :class="alert.type">
    {{ alert.message }}
    <button @click="alertStore.clear()" class="pi pi-times"></button>
</div>
</template>
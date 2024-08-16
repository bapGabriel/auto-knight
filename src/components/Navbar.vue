<script setup>
import { RouterLink, useRoute } from 'vue-router';
import logo from '@/assets/logo.svg';
import { useAuthStore } from '@/store';

const isActiveLink = (routePath) => {
    const route = useRoute();
    return route.path === routePath;
}

const authStore = useAuthStore();

// console.log("AuthStore: ", authStore.user.username);

</script>

<template>
<nav class="bg-primary border-b border-primary">
    <div class="mx-auto px-2 sm:px-6 lg:px-8">
        <div class="flex h-20 items-center justify-between">
            <div class="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
                <RouterLink class="flex flex-shrink-0 items-center mr-4" to="/">
                    <img class="h-10 w-auto" :src="logo" alt="Auto Knight"/>
                    <span class="hidden md:block text-xl text-bold ml-2">Auto Knight</span>
                </RouterLink>
                <div class="md:ml-auto">
                    <div class="flex space-x-2">
                        <RouterLink to="/" :class="[isActiveLink('/') ? 'bg-secondary-500' : 'hover:bg-secondary-500 hover:text-text-900', 'text-text', 'px-3', 'py-2', 'rounded-md']">
                            Principal
                        </RouterLink>
                        <div class="flex space-x-2" v-if="!authStore.user">
                            <RouterLink to="/registrar" :class="[isActiveLink('/registrar') ? 'bg-secondary-500' : 'hover:bg-secondary-500 hover:text-text-900', 'text-text', 'px-3', 'py-2', 'rounded-md']">
                                Registrar
                            </RouterLink>
                            <RouterLink to="/login" :class="[isActiveLink('/login') ? 'bg-secondary-500' : 'hover:bg-secondary-500 hover:text-text-900', 'text-text', 'px-3', 'py-2', 'rounded-md']">
                                Login
                            </RouterLink>
                        </div>
                        <div class="flex space-x-2" v-if="authStore.user">
                            <button @click="authStore.logout()" class="hover:bg-secondary-500 hover:text-text-900 text-text px-3 py-2 rounded-md">
                                Sair
                            </button>
                            <span class="align-middle px-3 py-2 text-text">Olá, {{ authStore.user.displayName }}!</span>
                        </div>
                    </div>
                </div>    
            
            </div>
        </div>
    </div>
</nav>
</template>
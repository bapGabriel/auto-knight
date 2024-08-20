<script setup>
import { useRoute } from 'vue-router';

const props = defineProps({
    to: {
        type: String,
        default: "/"
    }
});


const isActiveLink = (routePath) => {
    const route = useRoute();
    return route.path === routePath;
}

</script>

<template>
    <RouterLink :to="to" :class="[isActiveLink(to) ? 'bg-secondary-600' : 'hover:bg-secondary-600  hover:text-text', 'duration-100', 'text-text', 'px-3', 'py-2', 'rounded-md']">
        <slot></slot>
    </RouterLink>
</template>
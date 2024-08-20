<script setup>
const props = defineProps({
    title: {
        type: String,
        default: "título"
    }
})
</script>

<template>
    <div class="h-full flex flex-col justify-between">
        <div class="h-8 bg-primary-700 text-center content-center border-y-2 border-secondary">
            <span class="font-bold">{{ title }}</span>
        </div>
        <div class="p-2 h-full">
            <slot></slot>
        </div>
        <div class="h-8 bg-primary-700 text-center content-center border-y-2 border-secondary">
            
        </div>

    </div>
</template>
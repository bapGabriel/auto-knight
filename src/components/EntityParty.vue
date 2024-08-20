<script setup>
import { EnemyCard, PlayerCard } from "@/components";

const props = defineProps({
    
})


</script>
<template>
<div class="bg-primary p-4 flex flex-row gap-2 justify-around flex-wrap items-center min-h-96">
    <slot></slot>
</div>
</template>
<script setup>
import EnemyCard from "./EnemyCard.vue";
import PlayerCard from "./PlayerCard.vue";

const props = defineProps({
    
})


</script>
<template>
<div class="bg-background-600 p-1 grid grid-cols-3 gap-2 place-content-center place-items-center">
    <slot></slot>
</div>
</template>
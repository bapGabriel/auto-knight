<script setup>
import { usePlayerStore } from '@/store';
import EntityCard from './EntityCard.vue';

const playerStore = usePlayerStore();

const props = defineProps({
    id: Number
})

</script>
<template>
    <EntityCard
        :displayName="playerStore.party[id].displayName"
        :level="playerStore.party[id].level"
        :healthPoints="playerStore.party[id].healthPoints"
        :maxHealthPoints="playerStore.party[id].maxHealthPoints"
        :attack="playerStore.party[id].attack"
        :defense="playerStore.party[id].defense"
        :experiencePoints="playerStore.party[id].experiencePoints"
        :visualEffect="playerStore.party[id].visualEffect" />
</template>
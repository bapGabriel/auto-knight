<script setup>
import { usePlayerStore } from '@/store';
import EntityCard from './EntityCard.vue';

const playerStore = usePlayerStore();

const props = defineProps({
    cardId: Number
})

</script>
<template>
    <EntityCard
        type="ally"
        :displayName="playerStore.party[cardId].displayName"
        :level="playerStore.party[cardId].level"
        :healthPoints="playerStore.party[cardId].healthPoints"
        :maxHealthPoints="playerStore.party[cardId].maxHealthPoints"
        :attack="playerStore.getAttack(playerStore.party[cardId])"
        :defense="playerStore.getDefense(playerStore.party[cardId])"
        :experiencePoints="playerStore.party[cardId].experiencePoints"
        :imgSource="playerStore.party[cardId].img || '/src/assets/img/knight.svg'"
        :visualEffect="playerStore.party[cardId].visualEffect" />
</template>
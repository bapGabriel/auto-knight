<script setup>
import { useEntityStore } from '@/store';
import EntityCard from './EntityCard.vue';

const entityStore = useEntityStore();

const props = defineProps({
    cardId: Number
})

</script>
<template>
    <EntityCard
        type="enemy"
        :displayName="entityStore.entities[cardId].displayName"
        :level="entityStore.entities[cardId].level"
        :healthPoints="entityStore.entities[cardId].healthPoints"
        :maxHealthPoints="entityStore.entities[cardId].maxHealthPoints"
        :attack="entityStore.getAttack(entityStore.entities[cardId])"
        :defense="entityStore.getDefense(entityStore.entities[cardId])"
        :imgSource="entityStore.entities[cardId].img || '/src/assets/img/skull.svg'"
        :visualEffect="entityStore.entities[cardId].visualEffect" />
</template>
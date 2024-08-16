<script setup>
import { useEntityStore } from '@/store';
import EntityCard from './EntityCard.vue';

const entityStore = useEntityStore();

const props = defineProps({
    id: Number
})

</script>
<template>
    <EntityCard
        :displayName="entityStore.entities[id].displayName"
        :level="entityStore.entities[id].id"
        :healthPoints="entityStore.entities[id].healthPoints"
        :maxHealthPoints="entityStore.entities[id].maxHealthPoints"
        :attack="entityStore.entities[id].attack"
        :defense="entityStore.entities[id].defense"
        :visualEffect="entityStore.entities[id].visualEffect" />
</template>
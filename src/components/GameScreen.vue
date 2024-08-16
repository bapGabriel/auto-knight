<script setup>
import EnemyCard from "./EnemyCard.vue";
import PlayerCard from "./PlayerCard.vue";
import EntityParty from "./EntityParty.vue";
import { useEntityStore, usePlayerStore } from "@/store";

const playerStore = usePlayerStore();
const entityStore = useEntityStore();

</script>

<template>
    <div>
        <EntityParty class="border-b mb-2">
            <EnemyCard v-for="(entity, index) in entityStore.entities" :key="index" :id="index" />
        </EntityParty>
        <EntityParty class="border-t mt-2">
            <PlayerCard v-for="(player, index) in playerStore.party" :key="index" :id="index" />
        </EntityParty>
    </div>
</template>
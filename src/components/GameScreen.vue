<script setup>
import { EnemyCard, PlayerCard, EntityParty, BattleLog } from "@/components";
import { useEntityStore, usePlayerStore } from "@/store";

const playerStore = usePlayerStore();
const entityStore = useEntityStore();
</script>

<template>
    <div class="py-5">
        <div class="bg-primary-700 pl-10 p-2 border-y-2 border-secondary-600">
            <h3 class="font-bold text-lg tracking-wide">Inimigos</h3>
        </div>
        <EntityParty class="border-b border-secondary mb-2">
            <TransitionGroup name="list">
                <EnemyCard v-for="(entity, index) in entityStore.entities" :key="index" :cardId="index" />
            </TransitionGroup>
        </EntityParty>
        <BattleLog />
        <EntityParty class="border-t border-secondary mt-2">
            <TransitionGroup name="list">
                <PlayerCard v-for="(player, index) in playerStore.party" :key="index" :cardId="index" />
            </TransitionGroup>
        </EntityParty>
        <div class="bg-primary-700 pr-10 p-2 border-y-2 border-secondary-600 text-right">
            <h3 class="font-bold text-lg tracking-wide">Aliados</h3>
        </div>
        
    </div>
</template>
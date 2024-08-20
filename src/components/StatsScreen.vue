<script setup>
import { ManagementBody } from '@/components';
import { usePlayerStore } from '@/store';

const playerStore = usePlayerStore();

</script>

<template>
    <ManagementBody title="Status">
        <div>
            <div>
                <h3 class="font-bold my-1">Geral</h3>
                <p class="flex justify-between">
                    <span class="font-bold">Ouro: </span>
                    <span>{{ playerStore.inventory.gold }}</span>
                </p>
                <p class="flex justify-between">
                    <span class="font-bold">Vitórias: </span>
                    <span>{{ playerStore.wins }}</span>
                </p>
                <div class="border-b border-secondary h-1 w-full"></div>
            </div>
            <div v-for="(player, index) in playerStore.party" :key="index">
                <div>
                    <h3 class="font-bold my-1">{{ player.displayName }}</h3>
                    <p class="flex justify-between">
                        <span class="font-bold">HP:</span><span> <span class="text-accent" v-if="player.healthPoints < player.maxHealthPoints * 0.25">! PERIGO !</span> {{ player.healthPoints }} / {{ player.maxHealthPoints }} </span>
                    </p>
                    <p class="flex justify-between">
                        <span class="font-bold">Ataque:</span><span> {{ player.attack }} </span>
                    </p>
                    <p class="flex justify-between">
                        <span class="font-bold">Defesa:</span><span> {{ player.defense }} </span>
                    </p>
                    <p class="flex justify-between">
                        <span class="font-bold">Agilidade:</span><span> {{ player.agility }} </span>
                    </p>
                    <p class="flex justify-between">
                        <span class="font-bold">Experiência:</span><span> {{ player.experiencePoints }} / {{ playerStore.levelThreshold(player) }} </span>
                    </p>
                    
                </div>
                <div class="border-b border-secondary h-1 w-full"></div>
            </div>
        </div>
    </ManagementBody>
</template>
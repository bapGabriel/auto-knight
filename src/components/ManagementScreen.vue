<script setup>
import GearScreen from "@/components/GearScreen.vue";
import StatsScreen from "@/components/StatsScreen.vue";
import ManagementButton from "@/components/ManagementButton.vue";

import { useBattleStore } from "@/store";
import { storeToRefs } from "pinia";

const battleStore = useBattleStore();
const { isOver } = storeToRefs(battleStore);

</script>

<template>
    <div class="p-5">
        <div class="flex space-x-2">
            <ManagementButton class="flex w-full">Equipamento</ManagementButton>
            <ManagementButton class="flex w-full">Status</ManagementButton>
        </div>
        <div>
            <GearScreen />
            <StatsScreen />
        </div>
        <div>
            <ManagementButton :disabled="!isOver" class="w-full" @click="battleStore.processBattle()">
                <span v-show="isOver">Começar batalha</span>   
                <i v-show="!isOver" class="animate-spin pi pi-spinner"></i>   
            </ManagementButton>
        </div>
    </div>
</template>
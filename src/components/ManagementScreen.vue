<script setup>
import { GearScreen, StatsScreen, InventoryScreen, ShopScreen, OptionsScreen, ManagementButton  } from "@/components";

import { useBattleStore } from "@/store";
import { storeToRefs } from "pinia";

const battleStore = useBattleStore();
const { isOver, managementMenu } = storeToRefs(battleStore);

</script>

<template>
    <div class="p-5 flex flex-col gap-8 justify-between">
        <div class="flex flex-wrap gap-2">
            <div class="flex w-full gap-2">
                <ManagementButton @click="managementMenu = 'gear'" class="flex w-full">Equipamento</ManagementButton>
                <ManagementButton @click="managementMenu = 'stats'" class="flex w-full">Status</ManagementButton>
            </div>
            <div class="flex w-full gap-2">
                <ManagementButton @click="managementMenu = 'inventory'" class="flex w-full">Inventário</ManagementButton>
                <ManagementButton @click="managementMenu = 'shop'" class="flex w-full">Loja</ManagementButton>
            </div>
            <div class="flex w-full">
                <ManagementButton @click="managementMenu = 'options'" class="flex w-full">Opções</ManagementButton>
            </div>
        </div>
        <div class="h-full">
            <GearScreen v-if="managementMenu === 'gear'" />
            <StatsScreen v-if="managementMenu === 'stats'" />
            <InventoryScreen v-if="managementMenu === 'inventory'" />
            <ShopScreen v-if="managementMenu === 'shop'" />
            <OptionsScreen v-if="managementMenu === 'options'" />
        </div>
        <div>
            <ManagementButton :disabled="!isOver" class="w-full" @click="battleStore.processBattle()">
                <span v-show="isOver">Começar batalha</span>   
                <i v-show="!isOver" class="animate-spin pi pi-spinner"></i>   
            </ManagementButton>
        </div>
    </div>
</template>
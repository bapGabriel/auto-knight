<script setup>
import { ManagementBody } from '@/components';
import { useBattleStore } from '@/store';
import { computed } from 'vue';

const battleStore = useBattleStore();

const sliderValue = computed({
    get: () => battleStore.turnSpeed,
    set: (value) => battleStore.turnSpeed = value
})

</script>

<template>
    <ManagementBody title="Opções">
        <div>
            <label>Velocidade de combate</label>
            <input v-model="sliderValue" type="range" min="1" max="1000">
        </div>
    </ManagementBody>
</template>
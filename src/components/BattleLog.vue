<script setup>
import { useBattleStore } from '@/store';
import { storeToRefs } from 'pinia';
import { nextTick, ref, watch } from 'vue';

const battleStore = useBattleStore();
const { battleLog } = storeToRefs(battleStore);

const container = ref();

watch(battleLog, async () => {
    await nextTick();

    if(container.value){
        container.value.scrollTop = container.value.scrollHeight;
    }
})

</script>
<template>
<div ref="container" class="overflow-y-scroll h-32 px-8 scroll-auto">
    <p v-for="(log, index) in battleLog" :key="index" class="">
        <span class="font-bold font-mono">TURNO {{ log.turn }}: </span>
        <span class="">{{ log.message }}</span>
    </p>
</div>    
</template>
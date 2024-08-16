<script setup>
const props = defineProps({
    displayName: String,
    level: Number,
    experiencePoints: {
        type: [Number, Boolean],
        default: false
    },
    healthPoints: Number,
    maxHealthPoints: Number,
    attack: Number,
    defense: Number,
    imgSource: {
        type: String,
        default: ''
    },
    imgAlt: {
        type: String,
        default: ''
    },
    visualEffect: {
        type: Boolean,
        default: false
    }
})
</script>
<template>
<div class="flex-initial w-48 h-60 grid grid-rows-3 border rounded-md text-center" :class="{ 'shake' : visualEffect}">
    <div class="">
        <div class="bg-accent border-b border-dashed rounded-t-md p-1">
            <span class="font-bold underline">{{ `${displayName}` }}</span>
        </div>
        <div>
            <span>Lv. {{ `${level}` }}</span>
        </div>
    </div>
    <div>
        <div class="">
            <img :src="`${imgSource}`" :alt="`${imgAlt}`" />
        </div>
    </div>
    <div class="bg-secondary">
        <div class="px-2 flex justify-between">
            <span class="">{{ `${attack}` }}</span>
            <span v-show="!(experiencePoints === false)">{{ `${experiencePoints}` }}xp</span>
            <span class="">{{ `${defense}` }}</span>
        </div>
        <div class="">
            <div class="px-2 pb-2 bg-accent">
                <!-- <progress class="z-0 rounded-full" :value="`${healthPoints}`" :max="`${maxHealthPoints}`">
                    15
                </progress>
                <span class="z-10">{{ `${healthPoints} / ${maxHealthPoints}` }}</span> -->
                <span class="z-10">{{ `${healthPoints} / ${maxHealthPoints}` }}</span>
    
                <div class="w-full bg-health-0 rounded-full h-4">
                    <div class="rounded-full h-4" :class="[visualEffect ? 'animation-bg-red' : 'bg-health']" :style="`width: ${(healthPoints / maxHealthPoints)*100}%`">  </div>
                </div>

            </div>
        </div>
    </div>
</div>
</template>
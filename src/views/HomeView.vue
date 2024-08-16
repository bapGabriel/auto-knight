<script setup>
import { useAuthStore } from "@/store/auth.store";
import GameScreen from "@/components/GameScreen.vue";
import ManagementScreen from "@/components/ManagementScreen.vue";

const authStore = useAuthStore();
</script>

<template>
	<div v-show="!authStore.user">
		<h1>Auto Knight</h1>
		<p>Embarque nesta aventura automática pelas Terras Genéricas!</p>
		<p>Utilize seus conhecimentos matemáticos mais básicos para instruir seu autocavaleiro a derrotar o Grande Mau enquanto você apenas observa!</p>
		<p>Faça login antes de começar sua grande aventura!</p>
	</div>

	<div v-show="authStore.user" class="bg-primary border-b border-primary items-center justify-between flex space-x-3 h-full">
		<GameScreen class="border-2 border-dotted border-black grow" />
		<ManagementScreen class="border-2 border-dotted border-black grow" />
	</div>
</template>

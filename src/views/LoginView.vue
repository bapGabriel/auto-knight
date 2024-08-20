<script setup>
import { Form, Field} from "vee-validate";
import * as Yup from "yup";
import { ManagementButton } from "@/components";

import { useAuthStore } from '@/store';

const schema = Yup.object().shape({
    username: Yup.string().required("Informe o usuário!"),
    password: Yup.string().required("Informe a senha!")
});

async function onSubmit(values) {
    const authStore = useAuthStore();
    const { username, password } = values;
    await authStore.login(username, password);
}
</script>

<template>
    <div class="flex min-h-md flex-col justify-center px-6 py-4 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <h3 class="text-center text-2xl font-bold leading-9 tracking-tight"> Login </h3>
            <div class="border-b-2 border-secondary h-1"></div>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }" class="space-y-6">
                <div>
                    <label for="username" :class="{ 'text-accent': errors.username }" class="block text-sm font-medium leading-6">Usuário: </label>
                    <Field id="username" class="bg-background block mt-2 w-full rounded-md border-0 py-1.5 px-3 shadow-sm ring-1 ring-inset ring-secondary focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6" name="username" type="text" />
                    <div class="text-accent">{{ errors.username }}</div>
                </div>
                <div>
                    <div class="flex items-center justify-between">
                        <label for="password" :class="{ 'text-accent': errors.password }" class="block text-sm font-medium leading-6">Senha: </label>
                        <div class="text-sm">
                            <RouterLink to="#" tabindex="-1" class="font-semibold text-secondary hover:text-secondary-600">Esqueci minha senha</RouterLink>
                        </div>
                    </div>
                    <Field id="password" class="bg-background block mt-2 w-full rounded-md border-0 py-1.5 px-3 shadow-sm ring-1 ring-inset ring-secondary focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6" name="password" type="password" />
                    <div class="text-accent">{{ errors.password }}</div>
                </div>
                <div>
                    <ManagementButton :disabled="isSubmitting" class="w-full">
                        <span v-if="isSubmitting" class="animate-spin pi pi-spinner"></span>
                        <span v-else>Entrar</span>
                    </ManagementButton>
                </div>
            </Form>
        </div>
    </div>
</template>

<script setup>
import { Form, Field} from "vee-validate";
import * as Yup from "yup";

import { useAlertStore, useUserStore } from '@/store';

const schema = Yup.object().shape({
    username: Yup.string().required("Informe o usuário!"),
    displayName: Yup.string().required("Informe o nome de exibição!"),
    password: Yup.string().required("Informe a senha!")
});

async function onSubmit(values) {
    const userStore = useUserStore();
    await userStore.register(values);
}
</script>

<template>
    <div class="flex min-h-md flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <h3 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"> Registrar </h3>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }" class="space-y-6">
                <div>
                    <label for="username" :class="{ 'is-invalid': errors.username }" class="block text-sm font-medium leading-6 text-gray-900">Usuário: </label>
                    <Field id="username" class="block mt-2 w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" name="username" type="text" />
                    <div class="invalid-feedback">{{ errors.username }}</div>
                </div>
                <div>
                    <label for="displayName" :class="{ 'is-invalid': errors.displayName }" class="block text-sm font-medium leading-6 text-gray-900">Nome de exibição: </label>
                    <Field id="displayName" class="block mt-2 w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" name="displayName" type="text" />
                    <div class="invalid-feedback">{{ errors.displayName }}</div>
                </div>
                <div>
                    <label for="password" :class="{ 'is-invalid': errors.password }" class="block text-sm font-medium leading-6 text-gray-900">Senha: </label>
                    <Field id="password" class="block mt-2 w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" name="password" type="password" />
                    <div class="invalid-feedback">{{ errors.password }}</div>
                </div>
                <div>
                    <button :disabled="isSubmitting"  class="flex w-full justify-center rounded-md bg-secondary-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-secondary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-600">
                        <span v-show="isSubmitting">...</span>
                        Registrar
                    </button>
                </div>
                <div>
                    
                </div>
            </Form>
        </div>
    </div>
</template>

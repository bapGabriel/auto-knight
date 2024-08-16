import { defineStore } from "pinia";

import { useAlertStore } from "./alert.store";
import { router } from '@/router';
import axios from 'axios';

export const useAuthStore = defineStore({
    id:'auth',
    state: () => ({
        user: JSON.parse(localStorage.getItem('user')),
        returnUrl: null
    }),
    actions: {
        async login(username, password) {
            let users = {}
            axios.get("/api/users/")
                .then(response => {
                    users = response.data;
                    console.log("Login: ", users);
                    const user = users.find(x => x.username === username && x.password === password);
    
                    if (!user){
                        throw 'Usuário e/ou senha incorretos.'
                    };
    
                    this.user = user;
    
                    localStorage.setItem('user', JSON.stringify(user));
    
                    router.push('/');
                })
                .catch(error => {
                    const alertStore = useAlertStore();
                    alertStore.error(error);
                });
                    
        },
        logout() {
            this.user = null;
            localStorage.removeItem('user');
            router.push('/');
        }
    }
});
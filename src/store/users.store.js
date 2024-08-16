import { defineStore } from 'pinia'

import { useAlertStore } from "./alert.store";
import { router } from '@/router';
import axios from 'axios';

export const useUserStore = defineStore({
	id: 'users',
	state: () => ({
		users: {},
		user: {}
	}),
	actions: {
		async register(user){
			let users = {}
            axios.get("/api/users/")
                .then(response => {
                    users = response.data;
    
                    if (users.find(x => x.username === user.username)){
                        throw 'Este nome de usuário já está em uso, por favor escolha outro!';
                    }

					user.saveGame = "";
                })
                .catch(error => {
					const alertStore = useAlertStore();
                    alertStore.error("Erro no GET", error);
                })
				.finally(() => {
					axios.post("/api/users/", user)
						.then(response => {
							console.log("Registrado com sucesso?");
							router.push('/');
						})
						.catch(error => {
							const alertStore = useAlertStore();
							alertStore.error("Erro no POST", error);
						})
				});
		},
		async getAll(){},
		async getById(id){},
		async update(id, params){},
		async delete(){}
	}
})
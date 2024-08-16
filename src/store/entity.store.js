import { getRandomInt } from "@/modules/functions";
import axios from "axios";
import { defineStore } from "pinia";
import { usePlayerStore } from "./player.store";

export const useEntityStore = defineStore({
    id: 'entity',
    state: () => ({
        entities: [
            {
                id: 0,
                displayName: "Cruz Credo",
                level: 1,
                healthPoints: 20,
                maxHealthPoints: 100,
                attack: 5,
                defense: 5,
                agility: 10,
                equipment: {
                    weapon: 1,
                    armor: 1,
                    ring: 1,
                },
                visualEffect: false
            },
        ]
    }),
    getters: {
        partyHP(state){
            let totalHP = 0;
            for(let i = 0; i < state.entities.length; i++){
                totalHP += state.entities[i].healthPoints;
            }
            return totalHP;
        },
        size(state){
            return state.entities.length;
        },
        damage(state){
            return (combatant) => {
                let init = state.entities.find((member) => member === combatant).attack;
                let randomFluctuation = init * 0.2;
                let final = init + getRandomInt(randomFluctuation * -1, randomFluctuation);
                return final;
            }
        },
        threat(state){
            let threat = 0;
            state.entities.forEach(element => {
                threat += element.level;
            });
            return threat;
        }
    },
    actions: {
        async loadEntities(){
            let nextWave = [];
            this.entities = [];

            axios.get("/api/entities/")
                .then(response => {
                    const playerStore = usePlayerStore();
                    let threatLevel = 0;
                    let id = 0;

                    while(threatLevel < playerStore.threatCredits){
                        // Adiciona inimigos ao próximo turno, até que
                        // seu nivel de ameaça conjunto ultrapasse a
                        // quantia de créditos disponíveis.
                        let randomPick = response.data[0].enemies.length * Math.random() | 0;
                        let entity = {...response.data[0].enemies[randomPick]};

                        entity.id = id;
                        id++;
                        entity.maxHealthPoints = entity.healthPoints;
                        entity.visualEffect = false;

                        threatLevel += entity.level;
                        this.entities.push(entity);
                    }
                })
                .catch(error => {
                    console.error("Erro buscando inimigos na API: ", error);
                }).finally(() => {
                    this.entities.forEach(element => {
                        console.log("Entidade: " + element.displayName);
                    });
                    console.log("Entidades carregadas com sucesso?");
                })
        }
    }
})
import { getRandomInt } from "@/modules/functions";
import axios from "axios";
import { defineStore } from "pinia";
import { usePlayerStore } from "./player.store";

export const useEntityStore = defineStore({
    id: 'entity',
    state: () => ({
        // ent: [
        //     {
        //         id: 0,
        //         type: 0,
        //         displayName: "Autocavaleiro",
        //         level: 1,
        //         experiencePoints: 0,
        //         healthPoints: 100,
        //         maxHealthPoints: 100,
        //         attack: 10,
        //         defense: 10,
        //         agility: 10,
        //         equipment: {
        //             weapon: 1,
        //             armor: 1,
        //             ring: 1,
        //         }
        //     },
        // ],
        
        // allyParty: [
        //     {
        //         id: 0,
        //         displayName: "Autocavaleiro",
        //         level: 1,
        //         experiencePoints: 0,
        //         healthPoints: 100,
        //         maxHealthPoints: 100,
        //         attack: 10,
        //         defense: 10,
        //         agility: 10,
        //         equipment: {
        //             weapon: 1,
        //             armor: 1,
        //             ring: 1,
        //         }
        //     },

        // ],
        // enemyParty: [
        //     {
        //         id: 0,
        //         displayName: "Cruz Credo",
        //         level: 1,
        //         healthPoints: 20,
        //         maxHealthPoints: 100,
        //         attack: 10,
        //         defense: 10,
        //         agility: 10,
        //         equipment: {
        //             weapon: 1,
        //             armor: 1,
        //             ring: 1,
        //         },
        //         visualEffect: false
        //     },

        // ],
        // inventory: {
        //     weapon: [],
        //     armor: [],
        //     ring: [],
        //     potion: 0,
        //     gold: 0
        // },
        // wins: 0,


        entities: [
            {
                id: 0,
                displayName: "Cruz Credo",
                level: 1,
                healthPoints: 20,
                maxHealthPoints: 100,
                attack: 10,
                defense: 10,
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
        getAttack(state){
            return (combatant) => {
                let base = state.entities.find((member) => member === combatant).attack;
                let levelBonus = Math.floor((combatant.level**2) * 0.5);
                return base + levelBonus;
            }
        },
        damage(state){
            return (combatant) => {
                let base = this.getAttack(combatant);
                let randomFluctuation = base * 0.2;
                let final = base + getRandomInt(randomFluctuation * -1, randomFluctuation);
                return final;
            }
        },
        getDefense(state){
            return (combatant) => {
                let base = state.entities.find((member) => member === combatant).defense;
                let levelBonus = Math.floor((combatant.level**2) * 0.5);
                return base + levelBonus;
            }
        },
        block(state){
            return (combatant) => {
                let base = this.getDefense(combatant);
                let randomFluctuation = base * 0.2;
                let final = base + getRandomInt(randomFluctuation * -1, randomFluctuation);
                return final;
            }
        },
        getAgility(state){
            return (combatant) => {
                let base = state.entities.find((member) => member === combatant).agility;
                let levelBonus = Math.floor((combatant.level**2) * 0.5);
                return base + levelBonus;
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
            this.entities = [];

            await axios.get("/api/entities/")
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
                        entity.visualEffect = false;
                        
                        //TODO: Criar valores padrões caso nada seja encontrado
                        
                        //TODO: Inserir flutuações aleatórias nos stats
                        entity.healthPoints = entity.healthPoints + getRandomInt((entity.healthPoints * 0.2) * -1, (entity.healthPoints * 0.3));
                        entity.attack = entity.attack + getRandomInt((entity.attack * 0.2) * -1, (entity.attack * 0.3));
                        entity.defense = entity.defense + getRandomInt((entity.defense * 0.2) * -1, (entity.defense * 0.3));
                        entity.agility = entity.agility + getRandomInt((entity.agility * 0.2) * -1, (entity.agility * 0.3));

                        entity.maxHealthPoints = entity.healthPoints;
                        
                        threatLevel += entity.level;
                        this.entities.push(entity);
                    }

                    console.log("Inimigos carregados!");
                })
                .catch(error => {
                    console.error("Erro buscando inimigos na API: ", error);
                })
    },

    async kill(entity){
        this.entities.splice(this.entities.findIndex((element) => element === entity), 1);
    },

    async loadGame(){},
    async saveGame(){}

    }
})
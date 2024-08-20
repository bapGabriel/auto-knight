import { getRandomInt } from "@/modules/functions";
import { defineStore } from "pinia";

export const usePlayerStore = defineStore({
    id: 'player',
    state: () => ({
        party: [
            {
                id: 0,
                displayName: "Autocavaleiro",
                level: 1,
                experiencePoints: 0,
                healthPoints: 100,
                maxHealthPoints: 100,
                attack: 10,
                defense: 10,
                agility: 10,
                equipment: {
                    weapon: 1,
                    armor: 1,
                    ring: 1,
                }
            },
            {
                id: 1,
                displayName: "Autocavaleiro Clone",
                level: 1,
                experiencePoints: 0,
                healthPoints: 100,
                maxHealthPoints: 100,
                attack: 10,
                defense: 10,
                agility: 10,
                equipment: {
                    weapon: 1,
                    armor: 1,
                    ring: 1,
                }
            }
        ],
        inventory: {
            weapon: [],
            armor: [],
            ring: [],
            potion: 0,
            gold: 0
        },
        wins: 0
    }),
    getters: {
        partyHP(state){
            let totalHP = 0;
            for(let i = 0; i < state.party.length; i++){
                totalHP += state.party[i].healthPoints;
            }
            return totalHP;
        },
        size(state){
            return state.party.length;
        },
        getAttack(state){
            return (combatant) => {
                let base = state.party.find((member) => member === combatant).attack;
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
                let base = state.party.find((member) => member === combatant).defense;
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
                let base = state.party.find((member) => member === combatant).agility;
                let levelBonus = Math.floor((combatant.level**2) * 0.5);
                return base + levelBonus;
            }
        },
        threatCredits(state){
            let threat = 0;
            if(this.wins >= 5){
                threat += this.wins;
            }
            state.party.forEach(element => {
                threat += element.level;
            });
            return threat;
        },
        levelThreshold(state){
            return (combatant) => state.party.find((member) => member === combatant).level * 10;
        }
    },
    actions: {
        async victory(threat){
            this.wins++;
            await this.handleExperience(threat);
            await this.handleLoot(threat);
        },

        async handleExperience(threat){
            this.party.forEach(element => {
                let randomFluctuation = threat * 0.2;
                element.experiencePoints += threat + getRandomInt(randomFluctuation * -1, randomFluctuation);
                if(element.experiencePoints > this.levelThreshold(element)){
                    element.experiencePoints -= this.levelThreshold(element);
                    element.level++;
                    element.maxHealthPoints += 10*element.level; 
                    element.healthPoints = element.maxHealthPoints;
                }
            });

        },

        async handleLoot(threat){

        },

        async kill(entity){
            this.party.splice(this.party.findIndex((element) => element === entity), 1);
        }

    }
})
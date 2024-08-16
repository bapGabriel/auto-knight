import { defineStore } from "pinia";

import { usePlayerStore, useEntityStore, useAlertStore } from "@/store";

export const useBattleStore = defineStore({
    id: 'battle',
    state: () => ({
        turn: 0,
        combatants: [],
        isOver: true

    }),
    getters: {

    },
    actions: {
        async processBattle(){
            const playerStore = usePlayerStore();
            const entityStore = useEntityStore();

            await new Promise(resolve => setTimeout(resolve, 500));

            await this.sortTurnOrder(playerStore, entityStore);

            while(!this.isOver){
                console.log("BEGIN TURN: "+ this.turn);
                this.turn++;

                await this.processTurn(playerStore, entityStore);
                

                console.log("TURN "+ this.turn + " OVER. ==========================");

                await new Promise(resolve => setTimeout(resolve, 500));
            }

            this.isOver = true;
        },

        async processTurn(playerStore, entityStore){
            for(let i = 0; i < this.combatants.length; i++){
                await new Promise(resolve => setTimeout(resolve, 500));
                // this.combatants[i].healthPoints -= 50;
                // console.log("Atacante: " + this.combatants[i].displayName + " com " + this.combatants[i].agility);

                let target, damage;
                
                if(playerStore.party.includes(this.combatants[i])){
                    target = await this.getTarget(entityStore.entities);
                    damage = playerStore.damage(this.combatants[i]);
                }else{
                    target = await this.getTarget(playerStore.party);
                    damage = entityStore.damage(this.combatants[i]);

                }
                
                console.log("Target?: " + JSON.stringify(target, null, 4));
                
                this.attack(this.combatants[i], target, damage);

                if(playerStore.partyHP <= 0){ this.defeat(); break; }
                if(entityStore.partyHP <= 0){ this.victory(playerStore, entityStore); break; }

            }
            
        },

        async sortTurnOrder(playerStore, entityStore){
            this.combatants = [...playerStore.party, ...entityStore.entities];
            this.combatants.sort((a, b) => b.agility - a.agility);
            this.isOver = false;
        },

        async attack(attacker, target, damage){
            target.healthPoints -= damage;
            target.visualEffect = true;
            setTimeout(() => {
                target.visualEffect = false;
            }, 1500);
            console.log(attacker.displayName + " ataca " + target.displayName + " por " + damage + " de dano!");
            if(target.healthPoints <= 0) { target.healthPoints = 0; }
        },

        async getTarget(targets){
            const validTargets = targets.filter(target => target.healthPoints > 0);
            if(validTargets.length === 0){
                return null;
            } 
            return validTargets[validTargets.length * Math.random() | 0];
            // return validTargets[Math.round(Math.random() * validTargets.length)];
        },



        async victory(playerStore, entityStore){
            const alertStore = useAlertStore();
            this.isOver = true;
            alertStore.info("Você ganhou!");
            playerStore.victory(entityStore.threat);
            await entityStore.loadEntities();
        },

        async defeat(){
            const alertStore = useAlertStore();
            this.isOver = true;
            alertStore.info("Você foi derrotado...");
        }

        
    }
})
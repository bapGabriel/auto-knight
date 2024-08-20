import { defineStore } from "pinia";

import { usePlayerStore, useEntityStore, useAlertStore } from "@/store";

export const useBattleStore = defineStore({
    id: 'battle',
    state: () => ({
        turn: 0,
        combatants: [],
        isOver: true,
        battleLog: [],
        managementMenu: "stats",
        turnSpeed: 500,
        threat: 0
    }),
    getters: {

    },
    actions: {
        async processBattle(){
            const playerStore = usePlayerStore();
            const entityStore = useEntityStore();

            this.isOver = false;

            if(!entityStore.entities.length){
                await entityStore.loadEntities();
            }
            
            this.turn = 0;
            this.battleLog = '';

            await new Promise(resolve => setTimeout(resolve, this.turnSpeed));

            await this.sortTurnOrder(playerStore, entityStore);

            this.threat = entityStore.threat;

            while(!this.isOver){
                // console.log("BEGIN TURN: "+ this.turn);
                this.turn++;

                await this.processTurn(playerStore, entityStore);
                
                // console.log("TURN "+ this.turn + " OVER. ==========================");

                await new Promise(resolve => setTimeout(resolve, this.turnSpeed));
            }

            this.isOver = true;
        },

        async processTurn(playerStore, entityStore){
            for(let i = 0; i < this.combatants.length; i++){
                await new Promise(resolve => setTimeout(resolve, this.turnSpeed));
                // this.combatants[i].healthPoints -= 50;
                // console.log("Atacante: " + this.combatants[i].displayName + " com " + this.combatants[i].agility);

                let target, damage, block;
                
                if(playerStore.party.includes(this.combatants[i])){
                    target = await this.getTarget(entityStore.entities);
                    damage = playerStore.damage(this.combatants[i]);
                    block = entityStore.block(target);
                }else{
                    target = await this.getTarget(playerStore.party);
                    damage = entityStore.damage(this.combatants[i]);
                    block = playerStore.block(target);


                }
                
                
                // console.log("Target?: " + JSON.stringify(target, null, 4));
                
                await this.attack(this.combatants[i], target, damage, block);
                
                if(target.healthPoints <= 0){
                    if(playerStore.party.includes(this.target)){
                        await playerStore.kill(target);
                        this.combatants.splice(this.combatants.findIndex((element) => element === target), 1);
                    }else{
                        await entityStore.kill(target);
                        this.combatants.splice(this.combatants.findIndex((element) => element === target), 1);
                    }
                }

                if(playerStore.partyHP <= 0){ this.defeat(); break; }
                if(entityStore.partyHP <= 0){ this.victory(playerStore, entityStore); break; }
            }
            
        },

        async sortTurnOrder(playerStore, entityStore){
            this.combatants = [...playerStore.party, ...entityStore.entities];
            this.combatants.sort((a, b) => b.agility - a.agility);
        },

        async attack(attacker, target, damage, block){
            let log = {
                turn: this.turn,
                message: ''
            }
            let reduction = Math.max(0, 1 - (block / (2 * damage)));
            let increase = Math.max(0, (damage - block) / damage) * 2;
            let calculatedDamage = Math.floor(damage * reduction + increase);
            if(calculatedDamage === 0){
                log.message = "Bloqueado! " + attacker.displayName + " tenta atacar " + target.displayName + ", mas não é capaz de penetrar suas defesas!";
            }else if(calculatedDamage > (damage * 0.5)){
                log.message = "Brutal! " + attacker.displayName + " desfere um poderoso ataque em " + target.displayName + " por " + calculatedDamage + " de dano!!!";
            }else{
                log.message = attacker.displayName + " ataca " + target.displayName + " por " + calculatedDamage + " de dano!";
            }

            target.healthPoints -= calculatedDamage;
            target.visualEffect = true;
            setTimeout(() => {
                target.visualEffect = false;
            }, 1500);

            this.battleLog = [...this.battleLog, log];

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
            this.battleLog = [...this.battleLog, {turn: this.turn, message: "Vitória!"}]
            playerStore.victory(this.threat);
            // await entityStore.loadEntities();
        },

        async defeat(){
            const alertStore = useAlertStore();
            this.isOver = true;
            this.battleLog = [...this.battleLog, {turn: this.turn, message: "Derrota..."}]
        }

        

        
    }
})
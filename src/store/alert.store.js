import { defineStore } from "pinia";

export const useAlertStore = defineStore({
    id: 'alert',
    state: () => ({
        alert: null
    }),
    actions: {
        success(message) {
            this.alert = { message, type: 'alert-success' };
        },
        info(message) {
            this.alert = { message, type: 'alert-info' };
        },
        error(message) {
            this.alert = { message, type: 'alert-failure' };
        },
        clear() {
            this.alert = null;
        }
    }
})
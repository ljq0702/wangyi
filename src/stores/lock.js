import { defineStore } from "pinia";
import { ref } from "vue";

export const useLockStore = defineStore("lock",{
   // const lockState = ref(false);
   
   // function changeState() {
   //      lockState.value =!lockState.value;
   // }
   // return { lockState, changeState };
   state: () => {
      return {
         lockState: null
      }
   },
   persist: {
      enabled: true,
      key: "lockState",
   },
   getters: {
      getLockState: (state) => {
         return state.lockState;
      }
   },
   actions: {
      changeLockState(state) {
         console.log(this);
         this.lockState =!this.lockState;
      }
   }
});//useCounterStore
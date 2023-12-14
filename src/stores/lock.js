import { defineStore } from "pinia";
import { ref } from "vue";

export const useLockStore = defineStore("lock", () => {
   const lockState = ref(false);

   function changeState() {
        lockState.value =!lockState.value;
   }
   return { lockState, changeState };
});//useCounterStore
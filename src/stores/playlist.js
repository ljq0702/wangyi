import { defineStore } from "pinia";
import { ref } from "vue";

export const usePlayList =  defineStore('playlistSource', () => {
    const playList = ref([]);
    const playCurrentIndex = ref(0);

    function getPlayList(data){
        playList.value = data;
    }
    return {
        playCurrentIndex,
        playList
    }

})
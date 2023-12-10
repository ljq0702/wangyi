import service from "./index";

//  获取banner
export function getBanner(){
    return service.get('/banner');
}

// 推荐歌单
export function getPersonalized(limit){
    return service.get(`/personalized`, {params: {limit}})
}
// 新碟上架
export function getNewDisc(data){
    return service.get('/top/album',{params:data});
}
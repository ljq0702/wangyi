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
// 所有榜单
export function getTopList(){
    return service.get('/toplist');
}
// 获取歌单所有歌曲
export function getPlayListAll(data){
    return service.get('/playlist/track/all',{params:data});
}
// 获取歌单详情
export function getPlaylistDetail(id){
    return service.get('/playlist/detail',{params: {id}})
}
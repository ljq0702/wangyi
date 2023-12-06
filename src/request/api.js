import service from "./index";

export function getBanner(){
    return service.get('/banner');
}
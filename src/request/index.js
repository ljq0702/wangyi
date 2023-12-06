import axios from "axios";

// 创建axios实例

const service = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 5000,
    headers: {
        "Content-Type": 'application/json;charset=utf-8'
    }
})

// 请求拦截
service.interceptors.request.use((config)=>{
    config.headers = config.headers || {};
    if(localStorage.getItem('token')){
        config.headers.token = localStorage.getItem('token') || ""
    }
    return config
},error => {
    return Promise.reject(error)
})

// 响应拦截  后端返回来的数据
service.interceptors.response.use((res) => {
    const code = res.data.code
    if(code != 200){
        return Promise.reject(res)
    }else{
        // 请求成功
        return Promise.resolve(res.data)
    }
}, (err) => {
    console.log(err, '错误信息');
    return Promise.reject(err);
})

// 将实例暴露出去
export default service
import axios from 'axios';
/**
 * @author William Cui
 * @description 自定义配置请求axios实例
 * @return Promise 对象
 * @date 2018-05-23
 **/

const request = axios.create({
    baseURL: '/scs-web/a',
    timeout: 5000,
    headers: { 'Content-Type': 'application/json' }
});

request.interceptors.response.use(
    function(response) {
        if (response.status === 200) {
            return response.data;
        }
    },
    function(error) {
        const response = error.response;
        if (response && response.status === 403) {
            //登陆超时，请重新登陆
            console.log(333)
            sessionStorage.removeItem('account');
            window.location.assign('/');
        }
        return Promise.reject(error);
    }
);

export default request;

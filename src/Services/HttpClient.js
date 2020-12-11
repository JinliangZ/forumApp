import axios from 'axios';


export default  () =>{
    const token = localStorage.getItem('token');

    const defaultOptions = {
        headers: {
            Authorization: token ? `Bearer ${token}`: ''
        }
    };

//调用函数的时候如果 options 没指定du，就给它赋值zhi {} , {} 是一个空的 Object。

    return {
        get: (url, options ={}) => axios.get(url, {...defaultOptions,...options}),
        post: (url, data, options={}) => axios.post(url, data,{...defaultOptions,...options}),
        delete: (url,options = {}) => axios.delete(url, {...defaultOptions, ...options})

    }
};

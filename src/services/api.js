import axios from "axios";

const api = axios.create({
    baseURL: 'http://192.168.0.115:3000/'
    // baseURL: 'https://de-a-mao.herokuapp.com/'
})

export default api
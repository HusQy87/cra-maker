import axios from "axios";
export default {
    install: (Vue, options) => {
        Vue.prototype.$axios = axios.create({
            baseURL: options.baseUrl,
            headers: {
                Authorization: options.token ? `Bearer ${options.token}` : '',
            }
        })
    }
}

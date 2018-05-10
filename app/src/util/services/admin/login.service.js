import Vue from 'vue';
import { requestDOM } from '@/util/default.config';

class LoginService {
    constructor() {

    }

    login (data) {
        return Vue.axios.post(requestDOM + 'api/user/login', data).then(res => res.data);
    }
}

export default new LoginService();
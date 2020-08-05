import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://myreact-burgerbuilder-bc718.firebaseio.com/'
});

export default instance;


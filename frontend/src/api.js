import axios from 'axios';

export let BASE_URL = "http://localhost:3000/"

export default axios.create({
    baseURL: BASE_URL
})


import axios from 'axios';

export let BASE_URL = "http://evt.dyndns-ip.com:1243/"

export default axios.create({
    baseURL: BASE_URL
})


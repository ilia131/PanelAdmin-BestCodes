import axios from "axios";
import { getItem } from "../common/storage.services";

const baseURL = import.meta.env.VITE_BASE_URL

const instance = axios.create({
    baseURL: baseURL
})

const onSuccess =  (response) => {
    return response.data
}

const onError = (err) => {
   console.log(err)
   if(err.response.status >= 400 && err.response.status < 500) {
     alert('API NOT FOUND', err)
 }
  return Promise.reject(err)
}

instance.interceptors.response.use(onSuccess , onError)
instance.interceptors.request.use((opt) => {
    const token = getItem("token");
    // opt.headers["Content-Type"] = "application/json"
    opt.headers.Authorization = 'Bearer ' + token
    return opt
})

export default instance
import { header } from "framer-motion/client"
import axios from 'axios';
const baseUrl = "https://linked-posts.routemisr.com/"
const token = localStorage.getItem("token")


// export async function registerApi(formData) {
//     try {
//         const { data } = await axios.post(baseUrl + "users/signup", formData)
//         return data
//     } catch (error) {
//         return error.response ? error.response.data : { error: error.message };

//     }
// }
export async function registerApi(formData) {
    return axios.post(baseUrl + "users/signup", formData).then(res => res.data)
    // try {
    //     const { data } = await 
    //     return data
    // } catch (error) {
    //     return error.response ? error.response.data : { error: error.message };

    // }
}
// export async function loginApi(formData) {
//     try {
//         const { data } = await axios.post(baseUrl + "users/signin", formData)
//         return data
//     } catch (error) {
//         return error.response ? error.response.data : { error: error.message };
//     }
// }
export async function loginApi(formData) {
  return axios.post(baseUrl + "users/signin", formData).then(res => res.data)
}
export async function getLoggedUserDataApi() {
    try {
        const { data } = await axios.get(baseUrl + "users/profile-data", {
            headers: {
                token: token
            }
        })
        return data
    }
    catch (error) {
        return error.response ? error.response.data : { error: error.message };
    }
}

export function getDataProfile() {
    return axios.get(baseUrl + "users/profile-data", {
        headers: {
            token: token
        }
    })
}

export function updatePhotoProfile(formData) {
    return axios.put(baseUrl + "users/upload-photo", formData, {
        headers: {
            token: token,
        },
    });
}

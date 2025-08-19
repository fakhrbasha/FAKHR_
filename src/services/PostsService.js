import axios from "axios";

const baseUrl = "https://linked-posts.routemisr.com/"
const token = localStorage.getItem("token");

// export async function getAllPostsApi(page = 1) {
//     try {
//         const { data } = await axios.get(baseUrl + "posts", {
//             headers: {
//                 token: localStorage.getItem("token")
//             },
//             params: {
//                 page,
//                 sort:"-createdAt"
//             }
//         })
//         return data
//     } catch (error) {
//         return error.response ? error.response.data : { error: error.message };
//     }
// }
// now make function to use in useQuery
// when use return don't need to use async and await
// 
export function getAllPostsApi() {
    return axios.get(baseUrl + "posts", {
        headers: {
            token: localStorage.getItem("token")
        },
        params: {
            sort: "-createdAt"
        }
    })
}


export async function getSinglePostApi(postId) {
    try {
        const { data } = await axios.get(baseUrl + "posts/" + postId, {
            headers: {
                token: localStorage.getItem("token")
            }
        })

        return data
    } catch (error) {
        return error.response ? error.response.data : { error: error.message };
    }
}
// RQ
// export async function getSinglePostApi(postId) {
//     return axios.get(baseUrl + "posts/" + postId, {
//             headers: {
//                 token: localStorage.getItem("token")
//             }
//         })
// }
export async function addPost(formData) {
    try {
        const { data } = await axios.post(baseUrl + "posts", formData, {
            headers: {
                token: token
            }
        });
        return data;
    } catch (error) {
        return error.response ? error.response.data : { error: error.message };
    }
}

export async function deletePost(postId) {
    try {
        const { data } = await axios.delete(baseUrl + "posts/" + postId, {
            headers: {
                token: localStorage.getItem("token")
            }
        })
        return data
    } catch (error) {
        return error.response ? error.response.data : { error: error.message };
    }
}

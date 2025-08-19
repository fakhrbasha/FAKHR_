import axios from "axios";

const baseUrl = "https://linked-posts.routemisr.com/"

// export async function addComment(Content, postId) {
//     try {
//         const { data } = await axios.post(baseUrl + "comments", {

//             content: Content,
//             post: postId

//         }, {
//             headers: {
//                 token: localStorage.getItem("token")
//             }
//         })
//         return data
//     } catch (error) {
//         return error.response ? error.response.data : { error: error.message };
//     }
// }
export  function addComment(Content, postId) {
    return axios.post(baseUrl + "comments", {
            content: Content,
            post: postId

        }, {
            headers: {
                token: localStorage.getItem("token")
            }
        })
}

export async function deleteComment(commentId) {
    try {
        const { data } = await axios.delete(baseUrl + "comments/" + commentId, {
            headers: {
                token: localStorage.getItem("token")
            }
        })
        return data
    } catch (error) {
        return error.response ? error.response.data : { error: error.message };
    }
}
// put 
export async function updateComment(commentId , newContent) {
    try {
        const { data } = await axios.put(baseUrl + "comments/" + commentId,{
            content: newContent
        } ,{
            headers: {
                token: localStorage.getItem("token"),
            }
        })
        return data
    } catch (error) {
        return error.response ? error.response.data : { error: error.message };
    }
}


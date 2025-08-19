import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function useFetch(api) {
    const [data,setData] = useState(null)

    async function getData(){
        const {data} = await axios.get(api)
        setData(data);
    }
    useEffect(()=>{
        getData()
    },[])
    return data?.data
}
// export default function useFetch(endPoint) {
//     const [data,setData] = useState(null)

//     async function getData(){
//         const {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/"+endPoint)
//         setData(data);
//     }
//     useEffect(()=>{
//         getData()
//     },[])
//     return data?.data
// }

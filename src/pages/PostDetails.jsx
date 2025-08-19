import React, { useEffect, useState } from 'react'
import { getSinglePostApi } from '../services/PostsService'
import { useParams } from 'react-router-dom'
import Posts from '../components/Posts'
import Loader from './Loader'

export default function PostDetails() {
  const {id} = useParams()
  const [post , setPost] = useState("")
  const [loading, setLoading] = useState(true);
  async function getSinglePost(id){
    const data = await getSinglePostApi(id)
    if(data.message=='success'){
      setPost(data.post)
      setLoading(false);
    }
  }

  useEffect(()=>{
    getSinglePost(id)
  },[])

  return (
    <div>
      {loading ? <Loader /> : <Posts getAllPosts = {()=>{getSinglePost(id)}}  post={post} />}
    </div>
  )
}

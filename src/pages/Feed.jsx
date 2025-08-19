import { useEffect, useState } from 'react'
import { getAllPostsApi } from "../services/PostsService"
import Loader from './Loader'
import Posts from '../components/Posts'
import { addToast, Button } from '@heroui/react'
import { useNavigate } from 'react-router-dom'
import CreatePost from './CreatePost'
import { useQuery } from '@tanstack/react-query'
import { div } from 'framer-motion/client'
import useCounter from '../hooks/useCounter'
import useFetch from '../hooks/useFetch'
import { getDataProfile } from '../services/AuthServices'
export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  // custom hock
  // const [counter, setCounter] = useCounter(10);
  // console.log(counter);

  // custom hook
  // const  product  = useFetch("https://ecommerce.routemisr.com/api/v1/products"); 
  // console.log("Product",product);
  // const  brand  = useFetch("https://ecommerce.routemisr.com/api/v1/brands"); 
  // console.log("Brands : ", brand);


  const navigate = useNavigate();
  // async function getPosts() {
  //   const data = await getAllPostsApi()
  //   if (data.message == 'success') {
  //     setPosts(data.posts)
  //     setLoading(false);
  //   } else {
  //     console.log(data);
  //     localStorage.removeItem('token')
  //     addToast({
  //       title: data.error,
  //       description: 'please login again',
  //       timeout: 300,
  //       color: 'danger'
  //     });
  //     navigate('/login')
  //   }
  // }
  // useEffect(() => {
  //   getPosts()
  // }, [])

  const {
    data = [],
    refetch,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['posts'],
    queryFn: getAllPostsApi,
    select: (data) => data?.data.posts,
    retry: (failureCount, error) => {
      console.log(failureCount, error);
      return failureCount != 4;
    },
  });
  return (
    <>
      {isError && (
        <div className="text-center">
          <h1 className=" py-10 text-4xl">{error.message}</h1>
          <button onClick={refetch}>retry</button>
        </div>
      )}

      
      <div className="grid gap-3 max-w-3xl mx-auto">
        <CreatePost getAllPosts={refetch} />
        {isLoading ? (
          <Loader />
        ) : (
          data.map((post) => {
            return (
              <Posts
                getAllPosts={refetch}
                key={post.id}
                post={post}
                commentLimit={1}
              />
            );
          })
        )}
      </div>
    </>
  );
}

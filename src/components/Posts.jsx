import React, { useContext } from 'react'
import vector from "../assets/vector.jpg"
import Comment from './Comment'
import PostHeader from './PostHeader'
import PostBody from './PostBody'
import PostFooter from './PostFooter'
import PostAction from './PostAction'
import { useState } from 'react'
import { toast, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@heroui/react'
import CreateComment from './CreateComment'
import { deletePost } from '../services/PostsService'
import { AuthContext } from '../contexts/AuthContext'
import CardDropdown from './CardDropdown'
import Model from './Model'
export default function Posts({ post, commentLimit, getAllPosts, }) {
    const [visibleComment, setVisibleComment] = useState(2)
    const [isCommentLoading, setIsCommentLoading] = useState(false);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [likes, setLikes] = useState(post.likesCount || 0)
    
    function loadComment() {
        setIsCommentLoading(true)
        setTimeout(() => {
            setVisibleComment(visibleComment + 5)
            setIsCommentLoading(false)
        }, 500)
    }

    const { UserDate } = useContext(AuthContext);
    const [IsLoading, setIsLoading] = useState(false)

    async function handleDeletePost(onClose) {
        setIsLoading(true)
        const response = await deletePost(post._id)
        console.log();
        if (response.message == 'success') {
            await getAllPosts()
            setIsLoading(false)
            onClose();
        }
    }
    return (
        <>
            <div className="bg-white w-full rounded-md shadow-md h-auto py-3 px-3 my-5">
                <div className="w-full h-16 flex items-center justify-between ">
                    <PostHeader avatar={post.user.photo}  header={post.user.name} subHeader={new Date(post.createdAt).toLocaleString()} />
                    {

                        post?.user?._id == UserDate?._id && <CardDropdown onOpen={onOpen} />
                    }

                </div>
                <PostBody fullHight={!commentLimit} caption={post.body} photo={post.image} />

                <PostFooter  numOfLikes={likes} numOfComment={post.comments.length} />
                <PostAction likes={likes} setLikes={setLikes} postId={post.id} />
                <CreateComment getAllPosts={getAllPosts} postId={post.id} />
                {
                    // commentLimit ? post.comments.slice(0,commentLimit).map((comment) => <Comment comment={comment}/>) :
                    post.comments.slice(0, commentLimit ?? visibleComment).map((comment,index) => <Comment key={index}  comment={comment} />)
                }
                {visibleComment < post.comments.length && !commentLimit && <Button variant='ghost' isLoading={isCommentLoading} onPress={loadComment} className='block mx-auto border-1 rounded-lg mt-3'> Load more Comment</Button>}
            </div>



            <Model isOpen={isOpen} onOpenChange={onOpenChange} deleteFunction={handleDeletePost} title={'Post'} loading={IsLoading} />

        </>
    )
}

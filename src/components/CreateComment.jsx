import { Button, Input } from '@heroui/react'
import React, { useState } from 'react'
import { addComment } from '../services/commentService';
import { QueryClient, useMutation } from '@tanstack/react-query';
import { queryClient } from '../App';

export default function CreateComment({ postId, getAllPosts, post, setPost }) {
    const [comment, setComment] = useState('');
    // const [IsSubmitting, setIsSubmitting] = useState(false);

    // useMutation
    const { mutate: handleAddComment, isPending } = useMutation({
        mutationFn: () => addComment(comment, postId),
        onSuccess: async ({ data }) => {
            await queryClient.invalidateQueries(['posts'])
            setComment('')
        },
        onError: (error) => {
            console.log(error.message);
        },
        retry: 2,
    });

    // async function handleComment() {
    //     setIsSubmitting(true)
    //     const response = await addComment(comment, postId)
    //     if (response.message == 'success') {
    //         setComment('')
    //         await getAllPosts()
    //     }
    //     setIsSubmitting(false)
    // }

    return (
        <div className='flex relative'>
            <Input value={comment} onChange={(e) => { setComment(e.target.value); }} className='pe-24' placeholder='comment...' />
            <Button isLoading={isPending} isDisabled={comment.trim().length < 2} onPress={handleAddComment} color='primary' className='absolute top-0 bottom-0 end-0'>Comment</Button>

        </div>
    )
}

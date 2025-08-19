import React, { useContext, useState } from 'react'
import PostHeader from './PostHeader'
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@heroui/react'
import { AuthContext } from '../contexts/AuthContext'
import { deleteComment, updateComment } from '../services/commentService'
import CardDropdown from './CardDropdown'
import Model from './Model'
import { queryClient } from '../App'
export default function Comment({ comment, posts }) {
    const { UserDate } = useContext(AuthContext)
    const [IsCommentDeleting, setIsCommentDeleting] = useState(false)
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [IsUpdatingMode, setIsUpdatingMode] = useState(false)
    const [newCommentContent, setNewCommentContent] = useState(comment.content);
    const [isUpdateLoading, setIsUpdateLoading] = useState(false)


    // handleDeleteComment
    async function handleDeleteComment(onClose) {
        setIsCommentDeleting(true)
        const response = await deleteComment(comment._id)
        if (response.message == 'success') {
            await queryClient.invalidateQueries(['posts'])
            onClose()
        }
        setIsCommentDeleting(false);
    }

    // handleUpdateComment
    async function handleUpdateComment() {
        setIsUpdateLoading(true)
        const response = await updateComment(comment._id, newCommentContent)
        if (response.message == "success") {
            await queryClient.invalidateQueries(['posts'])
            setIsUpdatingMode(false)
        }
        setIsUpdateLoading(false)
    }

    return (
        <>
            <div>
                <div className="flex border-t-1 justify-between pt-5 mt-5 ">
                    <PostHeader avatar={comment.commentCreator?._id === UserDate?._id
                        ? UserDate?.photo
                        : comment?.commentCreator?.photo} header={comment?.commentCreator?.name} subHeader={comment?.createdAt} />
                    {

                        comment.commentCreator?._id == UserDate?._id && <CardDropdown setIsUpdatingMode={setIsUpdatingMode} onOpen={onOpen} />
                    }
                </div>
                {
                    IsUpdatingMode ?
                        <div className='ps-12 pt-3'>
                            <Input isDisabled={isUpdateLoading} value={newCommentContent} onChange={(e) => { setNewCommentContent(e.target.value) }} variant='bordered' />
                            <div className='flex justify-end pt-2 gap-2'>
                                <Button onPress={() => { setIsUpdatingMode(false) }} color='default' variant='bordered'>Cancel</Button>
                                <Button isDisabled={newCommentContent.trim().length < 2} isLoading={isUpdateLoading} onPress={handleUpdateComment} color='primary'>Update</Button>
                            </div>
                        </div>
                        :
                        <p className='ps-12 pt-2'>{comment.content}</p>

                }
            </div>

            <Model isOpen={isOpen} onOpenChange={onOpenChange} deleteFunction={handleDeleteComment} title={'Comment'} loading={IsCommentDeleting} />
        </>
    )
}

import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/react'
import React from 'react'

export default function Model({ isOpen , onOpenChange , loading , deleteFunction , title}) {
    return (
        <>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Delete {title} </ModalHeader>
                            <ModalBody>

                                <p>
                                    Are You Sure To Delete It
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="default" variant="light" onPress={onClose}>
                                    Cancel
                                </Button>
                                <Button isLoading={loading} color="danger" onPress={() => { deleteFunction(onClose) }}>
                                    Delete
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}

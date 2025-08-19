import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react'
import React from 'react'

export default function CardDropdown({onOpen , setIsUpdatingMode}) {
    return (
        <>
            <Dropdown>
                <DropdownTrigger>
                    <svg className="w-16 rotate-90 outline-none cursor-pointer" xmlns="http://www.w3.org/2000/svg" width={27} height={27} viewBox="0 0 24 24" fill="none" stroke="#b0b0b0" strokeWidth={2} strokeLinecap="square" strokeLinejoin="round">
                        <circle cx={12} cy={12} r={1} />
                        <circle cx={19} cy={12} r={1} />
                        <circle cx={5} cy={12} r={1} />
                    </svg>
                </DropdownTrigger>
                <DropdownMenu aria-label="Action event example">
                    <DropdownItem key="edit" onPress={()=>{setIsUpdatingMode(true)}}>Edit </DropdownItem>
                    <DropdownItem onPress={onOpen} key="delete" className="text-danger" color="danger">
                        Delete
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </>
    )
}

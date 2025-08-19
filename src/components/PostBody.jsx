import { caption } from 'framer-motion/client'
import React, { useState } from 'react'

export default function PostBody({caption , photo, fullHight}) {
    return (
        <>
            {caption && <p className='mt-4'>{caption}</p>}
            {photo && <img src={photo} className={`w-full ${!fullHight && 'h-100'} object-cover mt-5 rounded`} alt="" />}
        </>
    )
}

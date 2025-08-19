import React from 'react'

export default function PostFooter({numOfComment,numOfLikes }) {
    return (
        <>
            <div className="w-full h-8 flex items-center px-3 my-3">
                <div className="bg-blue-500 z-10 w-5 h-5 rounded-full flex items-center justify-center ">
                    <svg className="w-3 h-3 fill-current text-white" xmlns="http://www.w3.org/2000/svg" width={27} height={27} viewBox="0 0 24 24" fill="none" stroke="#b0b0b0" strokeWidth={2} strokeLinecap="square" strokeLinejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" /></svg>
                </div>
                <div className="w-full flex justify-between">
                    <p className="ml-3 text-gray-500">{numOfLikes}</p>
                    <p className="ml-3 text-gray-500">{numOfComment} comment</p>
                </div>
            </div>
        </>
    )
}

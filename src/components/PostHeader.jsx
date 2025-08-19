import React from 'react'
import { useNavigate } from 'react-router-dom'
const photo = 'https://imgs.search.brave.com/g6s-naIkFRgjS86GrNpbUblPcoLzH-lTkzd4fOTP0is/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdDQu/ZGVwb3NpdHBob3Rv/cy5jb20vOTk5ODQz/Mi8yNDQyOC92LzQ1/MC9kZXBvc2l0cGhv/dG9zXzI0NDI4NDc5/Ni1zdG9jay1pbGx1/c3RyYXRpb24tcGVy/c29uLWdyYXktcGhv/dG8tcGxhY2Vob2xk/ZXItbWFuLmpwZw'

export default function PostHeader({avatar , header ,subHeader} ) {
    return (
        <div>
            <div className="flex">
                <img className=" rounded-full w-10 h-10 mr-3" onError={(e) => { e.target.src = photo }} src={avatar}  alt="avatar" />
                <div>
                    <h3 className="text-md font-semibold ">{header}</h3>
                    <p className="text-xs text-gray-500">{subHeader}</p>
                </div>
            </div>
        </div>
    )
}

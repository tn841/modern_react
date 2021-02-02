import React from 'react'
import { Link } from 'react-router-dom'

function PostList({posts}){   
    return (
        <div>
            <h1>POST LIST</h1>
            <ul>
                {posts && posts.map(post => (
                    <li key={post.id}>
                        <Link to={`/${post.id}`} >{post.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default PostList
import React from 'react'

function Post({post}) {
    return (
        <div>
            <h1>{post.title}</h1>
            <hr/>
            <p>{post.body}</p>
        </div>
    )
}

export default Post
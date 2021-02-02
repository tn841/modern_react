import React from 'react'

function PostList({posts}){   
    return (
        <div>
            <h1>POST LIST</h1>
            <ul>
                {posts && posts.map(post => (<li key={post.id}>{post.title}</li>))}
            </ul>
        </div>
    )
}

export default PostList
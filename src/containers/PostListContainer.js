import React, {useEffect} from 'react'
import PostList from '../components/PostList'
import {useSelector, useDispatch} from 'react-redux'
import {getPosts, clearPost} from '../modules/posts'

function PostListContainer(){
    const {data, loading, error} = useSelector(state => (state.posts.posts))
    const dispatch = useDispatch();

    useEffect(() => {
        if(!data){
            dispatch(getPosts())
        }
        return () => {
            
        }
    }, [dispatch, data])

    if(loading && !data) return <div>로딩중</div>
    if(error) return <div>에러가 발생했습니다.</div>
    if(!data) return null

    return (
        <PostList 
            posts={data}
        />
    )
}

export default PostListContainer
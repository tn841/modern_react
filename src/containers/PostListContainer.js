import React, {useEffect} from 'react'
import PostList from '../components/PostList'
import {useSelector, useDispatch} from 'react-redux'
import {getPosts, clearPost} from '../modules/posts'

function PostListContainer(){
    // const state = useSelector(state => state)
    const {data, loading, error} = useSelector(state => (state.postsRTKReducer.posts))
    // const {data, loading, error} = {data:null, loading:false, error:null}
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts())

        return () => {
            
        }
    }, [dispatch])

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
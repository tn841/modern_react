import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Post from '../components/Post'
import { getPost } from '../modules/posts'

function PostContainer({postId}){
    const {data, loading, error} = useSelector(
        state => state.posts.post[postId]
    ) || {
        loading: false,
        data: null,
        error: null
    } // 특정 postId를 처음 조회하면 해당 데이터가 없기 때문에 첫 조회시 예외처리
    
    const dispatch = useDispatch();

    useEffect(() => {
        // if( data ) return;
        dispatch(getPost(postId));

        return () =>{
            // dispatch(clearPost())
        }
    }, [dispatch, postId])

    if (loading && !data) return <div>로딩중...</div>;
    if (error) return <div>에러 발생!</div>;
    if (!data) return null;

    return (
        <Post 
            post={data}
        />
    )
}

export default PostContainer
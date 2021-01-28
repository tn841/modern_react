import React, {useEffect} from 'react'

function HistorySample({history}) {

    const goHome = () => {
        history.push('/')
    }
    const goBack = () => {
        history.goBack();
    }

    useEffect(() => {
        console.log(history)
        const unblock = history.block('정말 떠나실건가요?')
        return () => {
            unblock()
        }
    }, [history])

    return (
        <div>
            <button onClick={goHome}>홈으로</button>
            <button onClick={goBack}>뒤로가기</button>
        </div>
    )
}

export default HistorySample
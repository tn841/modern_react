import { combineReducers } from 'redux'
import counter from './counter'

const rootReducer = combineReducers({
    counter
})

export default rootReducer

// rootReducer의 반환값을 유추해준다.
// 추후 이 타입을 컨테이너 컴포넌트에서 불러와서 사용해야 하므로 export해준다.
export type RootState = ReturnType<typeof rootReducer>;
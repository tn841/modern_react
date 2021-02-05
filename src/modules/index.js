import {combineReducers } from 'redux'
import counter, {counterSaga} from './counter'
// import todos from './todos'
import { postsRTKReducer, postsSaga } from './posts'
import { all } from 'redux-saga/effects'

const rootReducer = combineReducers ({
    counter,
    // todos,
    postsRTKReducer
})

export function* rootSaga() {
    yield all([counterSaga(), postsSaga()])  // all은 배열 안에 있는 사가를 동시에 실행시켜준다.
}

export default rootReducer
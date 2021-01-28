export function createAsyncDispatcher(type, promiseFn) {
    // action.type 문자열 선언
    const SUCCESS = `${type}_SUCCESS`;
    const ERROR = `${type}_ERROR`;

    // action 처리하는 함수 선언
    async function actionHander(dispatch, ...rest){
        dispatch({type}); // 요청 시작 loading...
        try{
            const data = await promiseFn(...rest)
            dispatch({
                type:SUCCESS,
                data
            })
        } catch (e) {
            dispatch({
                type:ERROR,
                error: e
            })
        }
    }

    return actionHander
}


export const initialAsyncState = {
    users: {
        loading: false,
        data: null,
        error: null
    },
    user: {
        loading: false,
        data: null,
        error: null
    }
};

// 로딩중일 때 바뀔 상태 객체
const loadingState = {
    loading: true,
    data: null,
    error: null
  };
  
  // 성공했을 때의 상태 만들어주는 함수
  const success = data => ({
    loading: false,
    data,
    error: null
  });
  
  // 실패했을 때의 상태 만들어주는 함수
  const error = error => ({
    loading: false,
    data: null,
    error: error
  })


// 세가지 액션을 처리하는 리듀서를 만들어줍니다
// type 은 액션 타입, key 는 리듀서서 사용할 필드 이름입니다 (예: user, users)
export function createAsyncHandler(type, key) {
    // 성공, 실패에 대한 액션 타입 문자열을 준비합니다.
    const SUCCESS = `${type}_SUCCESS`;
    const ERROR = `${type}_ERROR`;

    // 함수를 새로 만들어서
    function handler(state, action) {
        switch (action.type) {
        case type:
            return {
            ...state,
            [key]: loadingState
            };
        case SUCCESS:
            return {
            ...state,
            [key]: success(action.data)
            };
        case ERROR:
            return {
            ...state,
            [key]: error(action.error)
            };
        default:
            return state;
        }
    }
    // 반환합니다
    return handler;
    
}

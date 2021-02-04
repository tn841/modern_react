## 9장. 더 배우기 

- redux toolkit : https://redux-toolkit.js.org/
- TypeScript
- react 인증 구현 : https://www.daleseo.com/react-router-authentication/


### 9-1. Redux Toolkit
리덕스 툴킷은 redux 모듈을 작성하는 정형화된 방법을 제공한다. 순수한 redux를 사용하기위해서는 몇가지 단점들이 있었다.
1. Redux Store를 configure하기가 복잡하다.
2. Redux를 유용하게 사용하기 위해서는 많은 패키지를 추가해야한다.
3. Redux에는 너무 많은 boilerplate code가 필요하다.

위 단점들을 해결하기 위해 Redux Toolkit이 나왔다.


#### Redux Tookit이 제공하는 API
- configureStore()
- createSlice()
- createAsyncThunk()
- createEntitiyAdapter()
- createSelector()


#### 설치
```bash
npm install @reduxjs/toolkit
```

#### configureStore

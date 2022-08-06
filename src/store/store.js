import {compose,createStore,applyMiddleware} from 'redux'
import logger from 'redux-logger'
import {rootReducer} from "./root-reducer";

//persist
import {persistStore,persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'


//whenever an action hits the reducer,it hits the middlewares first
// run before the dispatch receive an action
const middleWares = [logger];

const composedEnhancers = compose(applyMiddleware(...middleWares));

const persistConfig = {
    //表示从root开始都可以存
    key: 'root',
    storage,
    //not need to persist user
    blacklist: ['user']
};

const persistedReducer = persistReducer(persistConfig,rootReducer);

// export const store = createStore(rootReducer,undefined,composedEnhancers);
export const store = createStore(persistedReducer,undefined,composedEnhancers);

export const persistor = persistStore(store);
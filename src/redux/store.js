import { applyMiddleware, combineReducers, createStore } from "redux";
import basketReducer from "./reducers/basketReducer";
import productReducer from "./reducers/productReducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({ basketReducer, productReducer })

export default createStore(rootReducer, applyMiddleware(thunk));

// const store = createStore(rootReducer);
// export default store 'da yapılabilirdi ama gerek yok zira store'u bu sayfada bir daha kullanmayacağız
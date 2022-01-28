import { createStore, applyMiddleware } from 'redux'
import reducer from './reducers/index'
import thunk from "redux-thunk"
import logger from "redux-logger"

const store = createStore(reducer, {}, applyMiddleware(logger, thunk))

export default store
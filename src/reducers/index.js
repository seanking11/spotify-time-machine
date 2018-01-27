import { combineReducers } from 'redux'
import AuthReducer from './AuthReducer'
import BuilderReducer from './BuilderReducer'

const rootReducer = combineReducers({
  auth: AuthReducer,
  builder: BuilderReducer
})

export default rootReducer

import { combineReducers } from 'redux'

import book from './book'
import member from './member'

const appReducer = combineReducers({
  book,
  member
})

export default appReducer
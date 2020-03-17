import { combineReducers } from 'redux'

import book from './book'
import member from './member'
import borrowed from './borrowed'

const appReducer = combineReducers({
  book,
  member,
  borrowed
})

export default appReducer
import axios from 'axios'
import { APP_URL } from '../../../config/Api'
import qs from 'qs'

const url = APP_URL.concat('book')

export const getBook = () => (dispatch) => {
  dispatch({ type: 'CHANGE_LOADING', isLoading: true })
  return (
    axios.get(url)
      .then(res => {
        dispatch({
          type: 'GET_BOOK',
          payload: res,
          isLoading: false,
          isSuccess: true,
        })
      })
      .catch(error => {
        dispatch({
          type: 'CHANGE_ERROR',
          isLoading: false,
          isError: true,
          msgError: error.message
        })
      })
  )
}

export const postBook = (data, config) => (dispatch) => {
  dispatch({ type: 'CHANGE_LOADING', isLoading: true })
  return (
    axios.post(url.concat(`/insert`), data, config)
      .then(res => {
        dispatch({
          type: 'POST_BOOK',
          isLoading: false,
          isSuccess: true
        })
      })
      .catch(error => {
        dispatch({
          type: 'CHANGE_ERROR',
          error: error,
          isLoading: false,
          isError: true,
          msgError: error.message
        })
      })
  )
}

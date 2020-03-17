import axios from 'axios'
import { APP_URL } from '../../../config/Api'
import qs from 'qs'

const url = APP_URL.concat('borrowed')

export const getBorrowed = () => (dispatch) => {
  dispatch({ type: 'CHANGE_LOADING', isLoading: true })
  return (
    axios.get(url)
      .then(res => {
        dispatch({
          type: 'GET_BORROWED',
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

export const postBorrowed = (data) => (dispatch) => {
  dispatch({ type: 'CHANGE_LOADING', isLoading: true })
  return (
    axios.post(url.concat(`/insert`), qs.stringify(data))
      .then(res => {
        dispatch({
          type: 'POST_BORROWED',
          isLoading: false,
          isSuccess: true
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

export const updateBorrowed = (data, borrowedId) => (dispatch) => {
  dispatch({ type: 'CHANGE_LOADING', isLoading: true })
  return (
    axios.put(url.concat(`/${borrowedId}/update`), data)
      .then(res => {
        dispatch({
          type: 'UPDATE_BORROWED',
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

export const delBorrowed = (borrowed_id) => (dispatch) => {
  dispatch({ type: 'CHANGE_LOADING', isLoading: true })
  return (
    axios.delete(url.concat(`/${borrowed_id}/delete`))
      .then(res => {
        dispatch({
          type: 'DEL_BORROWED',
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

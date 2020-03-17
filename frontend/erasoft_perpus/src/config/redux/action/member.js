import axios from 'axios'
import { APP_URL } from '../../../config/Api'
import qs from 'qs'
import swal from 'sweetalert'

const url = APP_URL.concat('member')

export const getMember = () => (dispatch) => {
  dispatch({ type: 'CHANGE_LOADING', isLoading: true })
  return (
    axios.get(url)
      .then(res => {
        dispatch({
          type: 'GET_MEMBER',
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

export const getMemberById = (member_id) => (dispatch) => {
  dispatch({ type: 'CHANGE_LOADING', isLoading: true })
  return (
    axios.get(url.concat(`/${member_id}`))
      .then(res => {
        dispatch({
          type: 'GET_MEMBER_BY_ID',
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

export const postMember = (data) => (dispatch) => {
  dispatch({ type: 'CHANGE_LOADING', isLoading: true })
  return (
    axios.post(url.concat(`/insert`), qs.stringify(data))
      .then(res => {
        if (res.data.success) {
          dispatch({
            type: 'POST_MEMBER',
            isLoading: false,
            isSuccess: true
          })
        } else {
          dispatch({ type: 'CHANGE_LOADING', isLoading: false })
          return (
            swal(`${res.data.msg.sqlMessage}`)
          )
        }

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

export const updateMember = (data, member_id) => (dispatch) => {
  dispatch({ type: 'CHANGE_LOADING', isLoading: true })
  return (
    axios.put(url.concat(`/${member_id}/update`), data)
      .then(res => {
        dispatch({
          type: 'UPDATE_MEMBER',
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

export const delMember = (member_id) => (dispatch) => {
  dispatch({ type: 'CHANGE_LOADING', isLoading: true })
  return (
    axios.delete(url.concat(`/${member_id}/delete`))
      .then(res => {
        dispatch({
          type: 'DEL_MEMBER',
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
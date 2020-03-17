const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  borrowedData: {},
  borrowedById: {},
  msgError: ''
}

const borrowed = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_LOADING':
      return {
        ...state,
        isLoading: action.isLoading,
        isError: false
      }
    case 'CHANGE_ERROR':
      return {
        ...state,
        isError: action.isError,
        isLoading: action.isLoading,
        msgError: action.msgError,
        isSuccess: false
      }
    case 'GET_BORROWED':
      return {
        ...state,
        isLoading: action.isLoading,
        isSuccess: action.isSuccess,
        borrowedData: action.payload.data,
        isError: false
      }
    case 'POST_BORROWED':
      return {
        ...state,
        isLoading: action.isLoading,
        isSuccess: action.isSuccess,
        isError: false
      }
    case 'UPDATE_BORROWED':
      return {
        ...state,
        isLoading: action.isLoading,
        isSuccess: action.isSuccess,
        isError: false
      }
    case 'DEL_BORROWED':
      return {
        ...state,
        isLoading: action.isLoading,
        isSuccess: action.isSuccess,
        isError: false
      }
    default:
      return state
  }
}

export default borrowed
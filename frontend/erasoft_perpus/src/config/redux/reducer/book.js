const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  bookData: {},
  bookById: {},
  msgError: ''
}

const book = (state = initialState, action) => {
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
    case 'GET_BOOK':
      return {
        ...state,
        isLoading: action.isLoading,
        isSuccess: action.isSuccess,
        bookData: action.payload.data,
        isError: false
      }
    case 'GET_BOOK_BY_ID':
      return {
        ...state,
        isLoading: action.isLoading,
        isSuccess: action.isSuccess,
        bookById: action.payload.data,
        isError: false
      }
    case 'POST_BOOK':
      return {
        ...state,
        isLoading: action.isLoading,
        isSuccess: action.isSuccess,
        isError: false
      }
    case 'UPDATE_BOOK':
      return {
        ...state,
        isLoading: action.isLoading,
        isSuccess: action.isSuccess,
        isError: false
      }
    case 'DEL_BOOK':
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

export default book
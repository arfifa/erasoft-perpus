const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  memberData: {},
  memberById: {},
  msgError: ''
}

const member = (state = initialState, action) => {
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
    case 'GET_MEMBER':
      return {
        ...state,
        isLoading: action.isLoading,
        isSuccess: action.isSuccess,
        memberData: action.payload.data,
        isError: false
      }
    case 'GET_MEMBER_BY_ID':
      return {
        ...state,
        isLoading: action.isLoading,
        isSuccess: action.isSuccess,
        memberById: action.payload.data,
        isError: false
      }
    case 'POST_MEMBER':
      return {
        ...state,
        isLoading: action.isLoading,
        isSuccess: action.isSuccess,
        isError: false
      }
    case 'UPDATE_MEMBER':
      return {
        ...state,
        isLoading: action.isLoading,
        isSuccess: action.isSuccess,
        isError: false
      }
    case 'DEL_MEMBER':
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

export default member
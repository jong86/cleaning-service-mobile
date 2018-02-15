import initialState from './initialState'

const reducers = (state = initialState, action) => {
  switch (action.type) {

    case ('SET_JOB_ID_SELECTED'):
      const { jobIdSelected } = action
      return {
        ...state,
        jobIdSelected,
      }

    case ('SET_CURRENT_VIEW'):
      const { currentView } = action
      return {
        ...state,
        currentView,
      }

    case ('SET_JOBS_LIST'):
      const { jobsList } = action
      return {
        ...state,
        jobsList,
      }

    case ('SET_AUTH_TOKEN'):
      const { authToken } = action
      return {
        ...state,
        authToken,
      }

    case ('SET_IS_LOADING'):
      const { isLoading } = action
      return {
        ...state,
        isLoading,
      }

    default:
      return { ...state }
  }
}

export default reducers

import initialState from './initialState'

const reducers = (state = initialState, action) => {
  switch (action.type) {

    case ('SET_JOB_ID_SELECTED'):
      const { newJobIdSelected } = action
      return {
        ...state,
        jobIdSelected: newJobIdSelected,
      }

    case ('SET_CURRENT_VIEW'):
      const { newView } = action
      return {
        ...state,
        currentView: newView,
      }

    case ('SET_JOBS_LIST'):
      const { newJobsList } = action
      return {
        ...state,
        jobsList: newJobsList,
      }

    default:
      return { ...state }
  }
}

export default reducers

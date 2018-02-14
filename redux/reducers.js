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

    default:
      return { ...state }
  }
}

export default reducers

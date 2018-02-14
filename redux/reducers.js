import initialState from './initialState'

const reducers = (state = initialState, action) => {
  switch (action.type) {

    case ('SET_JOB_ID_SELECTED'):
      const { jobIdSelected } = action
      return {
        ...state,
        jobIdSelected,
      }

    default:
      return { ...state }
  }
}

export default reducers

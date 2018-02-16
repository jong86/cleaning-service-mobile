import update from 'immutability-helper';
import initialState from './initialState'

const reducer = (state = initialState, action) => {
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
      const { incomingJobsList } = action
      return {
        ...state,
        jobsList: incomingJobsList,
      }


    case ('PUSH_TO_JOBS_LIST'):
      const { newJob } = action
      return update(state, {
        jobsList: { $push: [newJob] }
      })


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



    case ('UPDATE_JOB_STATE'):
      const { jobId, jobState } = action
      const { jobsList } = state

      // Find index of job with this id so we can update it
      let jobIndex
      for (let i = 0; i < jobsList.length; i++) {
        console.log(i, jobsList[i].id, jobId)
        if (jobsList[i].id === jobId) {
          jobIndex = i
          break
        }
      }

      return update(state, {
        jobsList: {
          [jobIndex]: { $set: jobState }
        }
      })



    case ('SET_USER_DATA'):
      const { userData } = action
      console.log("action data from reducer", action)
      return {
        ...state,
        userData: userData,
      }


    default:
      return { ...state }
  }
}

export default reducer

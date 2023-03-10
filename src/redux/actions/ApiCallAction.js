import { ReduxConstants } from "../ReduxConstants"

export const getDataAction = payload => ({ type: ReduxConstants.GET_DATA, payload })

export const fetchDataBeginAction = () => ({ type: ReduxConstants.FETCH_REQUEST_BEGIN })

export const fechRequestFailed = (error) => ({ type: ReduxConstants.FETCH_REQUEST_FAILED, payload: error })
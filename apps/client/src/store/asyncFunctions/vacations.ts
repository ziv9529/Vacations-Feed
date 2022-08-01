import { store } from ".."
import { ACTIONS } from "../actions"
import { followVacationService, getFollowedVacationsService, getVacationsService, unfollowVacationService } from "../services/vacationsService"
import { clearError, updateError } from "./auth"


function getDispatchStore() {
    return store.dispatch
}

export async function getVacationsAction() {
    const dispatch = getDispatchStore()
    dispatch({ type: ACTIONS.LOADER.SET_LOADER })
    try {
        const orders: any = await getVacationsService()
        dispatch(vacationSucceed(orders))
        dispatch(clearError())
    } catch (error: any) {
        if (error?.response?.data?.message) dispatch(updateError((error?.response?.data?.message) as string))
        else dispatch(updateError((error?.response?.data) as string))
        console.log("getVacationsAction error: " + error.message);
    } finally {
        dispatch({ type: ACTIONS.LOADER.CLEAR_LOADER })
    }
}
export async function getFilteredVacationsAction(user_id: any) {
    const dispatch = getDispatchStore()
    dispatch({ type: ACTIONS.LOADER.SET_LOADER })
    try {
        const followedVacationsResult: any = await getFollowedVacationsService(user_id);
        if(followedVacationsResult.length === 0){
            
        }
        dispatch(filterVacations(followedVacationsResult?.followedVacations))
        dispatch(clearError())
    } catch (error: any) {
        if (error?.response?.data?.message) dispatch(updateError((error?.response?.data?.message) as string))
        else dispatch(updateError((error?.response?.data) as string))
        console.log("getFilteredVacationsAction error: " + error.message);
    } finally {
        dispatch({ type: ACTIONS.LOADER.CLEAR_LOADER })
    }
}


export async function followVacationAction(vacation_id: number) {
    const dispatch = getDispatchStore()
    dispatch({ type: ACTIONS.LOADER.SET_LOADER })
    try {
        const result = await followVacationService(vacation_id);
        dispatch(vacationFollowSuccess(result))
        dispatch(clearError())

    } catch (error: any) {
        if (error?.response?.data?.message) dispatch(updateError((error?.response?.data?.message) as string))
        else dispatch(updateError((error?.response?.data) as string))
        console.log("deleteVacationAction error: " + error.message);
    } finally {
        dispatch({ type: ACTIONS.LOADER.CLEAR_LOADER })
    }
}
export async function unfollowVacationAction(follow_id: number) {
    const dispatch = getDispatchStore()
    dispatch({ type: ACTIONS.LOADER.SET_LOADER })
    try {
        const result = await unfollowVacationService(follow_id);
        dispatch(vacationUnfollowSuccess(result))
        dispatch(clearError())

    } catch (error: any) {
        if (error?.response?.data?.message) dispatch(updateError((error?.response?.data?.message) as string))
        else dispatch(updateError((error?.response?.data) as string))
        console.log("unfollowVacationAction error: " + error.message);
    } finally {
        dispatch({ type: ACTIONS.LOADER.CLEAR_LOADER })
    }
}
export async function getFollowedVacationsAction(user_id: any) {
    const dispatch = getDispatchStore()
    dispatch({ type: ACTIONS.LOADER.SET_LOADER })
    try {
        const { followedVacations } = await getFollowedVacationsService(user_id);
        dispatch(clearError())
        return followedVacations
    } catch (error: any) {
        if (error?.response?.data?.message) dispatch(updateError((error?.response?.data?.message) as string))
        else dispatch(updateError((error?.response?.data) as string))
        console.log("getFollowedVacationsAction error: " + error.message);
    } finally {
        dispatch({ type: ACTIONS.LOADER.CLEAR_LOADER })
    }
}

function vacationSucceed(payload: Array<any>) {
    return { type: ACTIONS.VACATIONS.GET_ALL_SUCCESS, payload }
}
function vacationFollowSuccess(payload: any) {
    return { type: ACTIONS.VACATIONS.FOLLOW_SUCCESS, payload }
}
function vacationUnfollowSuccess(payload: any) {
    return { type: ACTIONS.VACATIONS.UNFOLLOW_SUCCESS, payload }
}
function filterVacations(payload: any) {
    return { type: ACTIONS.VACATIONS.FILTER_FOLLOWED, payload }
}


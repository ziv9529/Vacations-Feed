import { store } from ".."
import { ACTIONS } from "../actions"
import { getAdminDataService } from "../services/adminService"
import { deleteVacationService } from "../services/vacationsService"
import { clearError, updateError } from "./auth"

function getDispatchStore() {
    return store.dispatch
}

export async function getAdminDataAction() {
    const dispatch = getDispatchStore()
    dispatch({ type: ACTIONS.LOADER.SET_LOADER })
    try {
        const adminData: any = await getAdminDataService()
        dispatch(adminDataSucceed(adminData))
        dispatch(clearError())
    } catch (error: any) {
        if (error?.response?.data?.message) dispatch(updateError((error?.response?.data?.message) as string))
        else dispatch(updateError((error?.response?.data) as string))
        console.log("getAdminDataAction error: " + error.message);
    } finally {
        dispatch({ type: ACTIONS.LOADER.CLEAR_LOADER })
    }
}

export async function deleteVacationAction(vacation_id: number) {
    const dispatch = getDispatchStore()
    dispatch({ type: ACTIONS.LOADER.SET_LOADER })
    try {
        const result = await deleteVacationService(vacation_id);
        if (result) {
            dispatch(clearError())
            return result
        }
    } catch (error: any) {
        if (error?.response?.data?.message) dispatch(updateError((error?.response?.data?.message) as string))
        else dispatch(updateError((error?.response?.data) as string))
        console.log("deleteVacationAction error: " + error.message);
    } finally {
        dispatch({ type: ACTIONS.LOADER.CLEAR_LOADER })
    }
}
export async function editVacationAction(vacation_id: number) {
    const dispatch = getDispatchStore()
    dispatch({ type: ACTIONS.LOADER.SET_LOADER })
    try {
        dispatch(editVacation(vacation_id))
        dispatch(clearError())
    } catch (error: any) {
        if (error?.response?.data?.message) dispatch(updateError((error?.response?.data?.message) as string))
        else dispatch(updateError((error?.response?.data) as string))
        console.log("editVacationAction error: " + error.message);
    } finally {
        dispatch({ type: ACTIONS.LOADER.CLEAR_LOADER })
    }
}
function adminDataSucceed(payload: Array<any>) {
    return { type: ACTIONS.ADMIN.GET_DATA_SUCCESS, payload }
}
function editVacation(payload: any) {
    return { type: ACTIONS.ADMIN.EDIT, payload }
}
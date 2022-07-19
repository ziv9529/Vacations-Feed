import { store } from "../index";
import { ACTIONS } from "../actions";
import { loginService, logoutService, registerService } from "../services/authService";

function getDispatchStore() {
    return store.dispatch;
}

export async function loginAction(payload: any) {
    const dispatch = getDispatchStore();
    dispatch({ type: ACTIONS.LOADER.SET_LOADER })
    try {
        const loginResponse = await loginService(payload);
        dispatch(loginSuccess(loginResponse));
        dispatch(clearError())
        return loginResponse
    } catch (error: any) {
        dispatch(updateError((error?.response?.data) as string))
        console.log("loginAction error: " + error.message);
    } finally {
        dispatch({ type: ACTIONS.LOADER.CLEAR_LOADER })
    }
}
export async function registerAction(payload: any) {
    const dispatch = getDispatchStore();
    dispatch({ type: ACTIONS.LOADER.SET_LOADER })
    try {
        const registerResponse = await registerService(payload);
        dispatch(registerSuccess(registerResponse));
        dispatch(clearError())
        return registerResponse
    } catch (error: any) {
        if (error?.response?.data?.message) dispatch(updateError((error?.response?.data?.message) as string))
        else dispatch(updateError((error?.response?.data) as string))
        console.log("registerAction error: " + error.message);
    } finally {
        dispatch({ type: ACTIONS.LOADER.CLEAR_LOADER })
    }
}
export async function logOutAction() {
    const dispatch = getDispatchStore();
    dispatch({ type: ACTIONS.LOADER.SET_LOADER })
    try {
        const logOutResponse = await logoutService();
        dispatch(logoutSuccess(logOutResponse));
        return logOutResponse
    } catch (error: any) {
        console.log("logOutAction error: " + error.message);
    } finally {
        dispatch({ type: ACTIONS.LOADER.CLEAR_LOADER })
    }
}
function loginSuccess(payload: any) {
    return { type: ACTIONS.LOGIN.SUCCESS, payload };
}
function registerSuccess(payload: any) {
    return { type: ACTIONS.REGISTER.REGISTER_SUCCESS, payload };
}
function logoutSuccess(payload: any) {
    return { type: ACTIONS.LOGOUT.LOGOUT_SUCCESS, payload };
}
export function updateError(message?: string) {
    return { type: ACTIONS.ERROR.TOGGLE, payload: { isError: true, message: message } };
}
export function clearError(message?: string) {
    return { type: ACTIONS.ERROR.TOGGLE, payload: { isError: false, message: "" } };
}

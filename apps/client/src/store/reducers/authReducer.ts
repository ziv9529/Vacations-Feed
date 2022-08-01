import { ACTIONS } from "../actions"
import { getTokenLS, setTokenLS } from "./helpers/localStorage"

interface IInitialState {
    token: string,
    user_role: string,
    user_id: string,
    user_first_name: string
}
const initialState: IInitialState = {
    token: getTokenLS(),
    user_role: "",
    user_id: "",
    user_first_name: ""
}

export const authReducer = (state = initialState, action: { type: string, payload?: any }) => {

    switch (action.type) {
        case ACTIONS.LOGIN.SUCCESS: {
            setTokenLS(action?.payload?.token);
            return {
                ...state,
                token: action?.payload?.token,
                user_role: action?.payload?.user_role,
                user_id: action?.payload?.user_id,
                user_first_name: action?.payload?.user_first_name
            }
        }
        case ACTIONS.LOGOUT.LOGOUT_SUCCESS: {
            window.localStorage.clear();
            return { ...state, token: "", user_role: "", user_id: "", user_first_name: "" }
        }
        default:
            return state
    }
}

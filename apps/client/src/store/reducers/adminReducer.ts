import { ACTIONS } from "../actions"

interface IInitialState {
    adminData: Array<any>,
    vacationIDToEdit: number
}
const initialState: IInitialState = {
    adminData: [],
    vacationIDToEdit: -1
}

export const adminReducer = (state = initialState, action: { type: string, payload?: any }) => {
    switch (action.type) {
        case ACTIONS.ADMIN.GET_DATA_SUCCESS: {
            return { ...state, adminData: action?.payload }
        };
        case ACTIONS.ADMIN.EDIT: {
            return { ...state, vacationIDToEdit: action?.payload }
        };
        case ACTIONS.ADMIN.RESET_EDIT: {
            return { ...state, vacationIDToEdit: -1 }
        };
        default:
            return state
    }
}

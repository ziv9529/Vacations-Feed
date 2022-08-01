import { ACTIONS } from "../actions"

interface IInitialState {
    isLoading: boolean,
}
const initialState: IInitialState = {
    isLoading: false
}

export const loaderReducer = (state: IInitialState = initialState, action: { type: string, payload?: any }) => {
    switch (action.type) {
        case ACTIONS.LOADER.SET_LOADER: {
            return { ...state, isLoading: true }
        }
        case ACTIONS.LOADER.CLEAR_LOADER: {
            return { ...state, isLoading: false }
        }
        default:
            return state
    }
}

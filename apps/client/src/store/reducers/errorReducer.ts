import { ACTIONS } from "../actions"

interface IInitialState {
    message: string,
    isError: boolean,
}
const initialState: IInitialState = {
    message: "",
    isError: false
}

export const errorReducer = (state: IInitialState = initialState, action: { type: string, payload?: IInitialState }) => {
    switch (action.type) {
        case ACTIONS.ERROR.TOGGLE: {
            return { ...state, ...action.payload }
        }
        default:
            return state
    }
}

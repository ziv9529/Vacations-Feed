import { ACTIONS } from "../actions"

interface IInitialState {
    vacations: Array<any>,
    follow_action: boolean,
    isShowOnlyFollowed: boolean
}
const initialState: IInitialState = {
    vacations: [],
    follow_action: false,
    isShowOnlyFollowed: false
}

export const vacationsReducer = (state: any = initialState, action: { type: string, payload?: any }) => {
    switch (action.type) {
        case ACTIONS.VACATIONS.GET_ALL_SUCCESS: {
            return { ...state, vacations: action?.payload }
        }
        case ACTIONS.VACATIONS.FOLLOW_SUCCESS: {
            return { ...state, follow_action: !state.follow_action }
        }
        case ACTIONS.VACATIONS.UNFOLLOW_SUCCESS: {
            return { ...state, follow_action: !state.follow_action }
        }
        case ACTIONS.VACATIONS.FILTER_FOLLOWED: {
            const { vacations } = state
            const { payload } = action
            let filteredVacations: any = []
            vacations.forEach((v: any) => {
                payload.map((v_follow: any) => {
                    if (v.vacation_id === v_follow.vacation_id) {
                        filteredVacations.push(v)
                    }
                })
            })
            return { ...state, vacations: filteredVacations }
        }
        case ACTIONS.VACATIONS.SHOW_ONLY_FOLLOWED: {
            return { ...state, isShowOnlyFollowed: true }
        }
        case ACTIONS.VACATIONS.UNDO_SHOW_ONLY_FOLLOWED: {
            return { ...state, isShowOnlyFollowed: false }
        }
        default:
            return state
    }
}

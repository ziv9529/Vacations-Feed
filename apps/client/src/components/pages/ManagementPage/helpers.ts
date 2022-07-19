export interface ManagementState {
    vacation_destination: string,
    vacation_description: string,
    vacation_start_date: string,
    vacation_end_date: string,
    vacation_cost: number
}
export function getinitialDate() {
    const currentDate = new Date();
    let initialMonth = '';
    if (currentDate.getMonth() < 10) {
        initialMonth = `0${currentDate.getMonth()}`
    } else {
        initialMonth = currentDate.getMonth().toString()
    }
    const initialDate = `${currentDate.getFullYear()}-${initialMonth}-${currentDate.getDate()}`
    return initialDate
}
export const initialAdminVacationState:ManagementState = {
    vacation_destination: "",
    vacation_description: "",
    vacation_start_date: getinitialDate(),
    vacation_end_date: getinitialDate(),
    vacation_cost: 0,
}
export const isErrorInManagement = (obj: ManagementState, prop: keyof ManagementState) => {
    if (prop === "vacation_cost") {
        if ((obj[prop] as any) < 1) return true
    } else {
        if ((obj[prop] as any).length < 2) return true
        else return false
    }
};
export const isAdminFormValid = (obj: ManagementState) => {
    if (
        isErrorInManagement(obj, 'vacation_cost') ||
        isErrorInManagement(obj, 'vacation_description') ||
        isErrorInManagement(obj, 'vacation_destination') ||
        isErrorInManagement(obj, 'vacation_end_date') ||
        isErrorInManagement(obj, 'vacation_start_date')
    ) return false
    else return true
};

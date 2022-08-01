export interface RegisterState {
    user_first_name: string,
    user_last_name: string,
    user_email: string,
    user_site_username: string,
    user_password: string,
}
export const initialRegisterState:RegisterState = {
    user_first_name: "",
    user_last_name: "",
    user_email: "",
    user_site_username: "",
    user_password: "",
}
export const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
};
export const isRegisterError = (obj: RegisterState, prop: keyof RegisterState) => {
    if ((obj[prop] as any).length < 2) return true
    else return false
};
export const isRegisterFormValid = (obj: RegisterState) => {
    if (
        isRegisterError(obj, 'user_password') ||
        isRegisterError(obj, 'user_email') ||
        isRegisterError(obj, 'user_first_name') ||
        isRegisterError(obj, 'user_last_name') ||
        isRegisterError(obj, 'user_site_username')
    ) return false
    else return true
};
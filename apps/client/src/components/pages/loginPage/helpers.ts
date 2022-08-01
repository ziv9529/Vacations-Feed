export interface LoginState {
    userName: string,
    password: string;
    showPassword: boolean;
}
export const initialLoginState: LoginState = {
    userName: '',
    password: '',
    showPassword: false,
}
export const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
};
export const isLoginError = (obj: LoginState, prop: keyof LoginState) => {
    if ((obj[prop] as any).length < 2) return true
    else return false
}
export const isLoginFormValid = (obj: LoginState) => {
    if (isLoginError(obj, 'userName') || isLoginError(obj, 'password')) return false
    else return true
};
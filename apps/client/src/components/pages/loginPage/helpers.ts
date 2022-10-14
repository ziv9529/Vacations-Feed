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
    if ((obj[prop] as any).length === 1) return true
    else return false
}
export const isLoginFormValid = (obj: LoginState): boolean => {
    let result: boolean = true
    for (const key in obj) {
        if (typeof (key) === "boolean") break
        else {
            if (((obj[key as keyof LoginState]) as string).length < 2) {
                result = false;
            }
        }

    }
    return result;
    // if (isLoginError(obj, 'userName') || isLoginError(obj, 'password')) return false
    // else return true
};
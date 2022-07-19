import { getConnection } from "../db";
import { checkUserQuery, getRegisterUserQuery } from "./queries";

export async function registerUser(user_first_name: string, user_last_name: string, user_email: string, user_site_username: string, user_password: string) {
    try {
        const query = getRegisterUserQuery()
        const [result] = await getConnection().execute(query,
            [user_first_name, user_last_name, user_email, user_site_username, user_password]);
        return result.insertId;
    } catch (error) {
        console.log("registerUser error : " + error.message);
    }
}

export async function isUserExist(user_site_username: string) {
    try {
        const query = checkUserQuery();
        const [result] = await getConnection().execute(query, [user_site_username]);
        return result[0];
    } catch (error) {
        console.log("isUserExist error: " + error.message);
    }
}
export function isPasswordMatch(user: any, password: string) {
    return user.user_password === password;
}
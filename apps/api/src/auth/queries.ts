export function getRegisterUserQuery():string{
    return `INSERT INTO vacations.users (user_first_name, user_last_name, user_email, user_site_username, user_password) VALUES (?, ?, ?, ?, ?);`
}
export function checkUserQuery():string{
    return `SELECT * FROM vacations.users WHERE user_site_username = ?;`
}


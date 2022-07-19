export function getAllVacationsQuery(): string {
    return `
    SELECT 
    t1.vacation_id,
    t1.vacation_destination,
    t1.vacation_description,
    t1.vacation_start_date,
    t1.vacation_end_date,
    t1.vacation_cost,
    t1.vacation_image,
    t2.number_of_followers
FROM
    vacations.vacations t1
        LEFT JOIN
    (SELECT 
        vacation_id, COUNT(*) AS number_of_followers
    FROM
        vacations.vacation_followers
    GROUP BY vacation_id) t2 ON t1.vacation_id = t2.vacation_id
ORDER BY t1.vacation_start_date DESC;
    `
}
export function getFollowVacationQuery(): string {
    return `INSERT INTO vacations.vacation_followers (user_id, vacation_id) VALUES (?, ?);`
}
export function getUnfollowVacationQuery(): string {
    return `DELETE FROM vacations.vacation_followers WHERE (follow_id = ?);
    `
}
export function addVacationQuery(): string {
    return `INSERT INTO vacations.vacations (vacation_destination, vacation_description, vacation_start_date, vacation_end_date, vacation_cost,vacation_image) VALUES (?, ?, ?, ?, ?,?);`
}
export function isVacationInDBQuery(): string {
    return `SELECT * FROM vacations.vacations WHERE vacation_id = ?;`
}
export function deleteVacationQuery(): string {
    return `DELETE FROM vacations.vacations WHERE (vacation_id = ?);`
}
export function getFollowedVacationsByUserId(): string {
    return `SELECT * FROM vacations.vacation_followers WHERE user_id = ?;`
}
export function updateVacationQuery(): string {
    return `
    UPDATE vacations.vacations 
SET 
    vacation_destination = ?,
    vacation_description = ?,
    vacation_start_date = ?,
    vacation_end_date = ?,
    vacation_cost = ?,
    vacation_image = ?
WHERE
    (vacation_id = ?);
    `
}
import { getConnection } from "../db";
import { addVacationQuery, deleteVacationQuery, getAllVacationsQuery, getFollowedVacationsByUserId, getFollowVacationQuery, getUnfollowVacationQuery, isVacationInDBQuery, updateVacationQuery } from "./queries";

export async function getVacationsLogic() {
    try {
        const query = getAllVacationsQuery();
        const [result] = await getConnection().query(query);
        return result
    } catch (error) {
        console.log("getVacationsLogic error : " + error.message);
    }
}
export async function getAllFollowedVacationsByUserLogic(user_id: any) {
    try {
        const query = getFollowedVacationsByUserId();
        const [result] = await getConnection().execute(query, [user_id]);
        return result
    } catch (error) {
        console.log("getAllFollowedVacationsByUserLogic error : " + error.message);
    }
}

export async function followVacationLogic(user_id: any, vacationId: any) {
    try {
        const query = getFollowVacationQuery();
        const [result] = await getConnection().execute(query, [user_id, vacationId]);
        return result.insertId
    } catch (error) {
        console.log("followVacationLogic error : " + error.message);
    }
}
export async function unfollowVacationLogic(follow_id: any) {
    try {
        const query = getUnfollowVacationQuery();
        const [result] = await getConnection().execute(query, [follow_id]);
        return result
    } catch (error) {
        console.log("unfollowVacationLogic error : " + error.message);
    }
}
export async function addVacationLogic(data: any) {
    const { vacation_destination,
        vacation_description,
        vacation_start_date,
        vacation_end_date,
        vacation_cost,
        vacation_image } = data
    try {
        const query = addVacationQuery();
        const [result] = await getConnection().execute(query, [vacation_destination, vacation_description, vacation_start_date, vacation_end_date, vacation_cost, vacation_image]);
        return result.insertId
    } catch (error) {
        console.log("addVacationLogic error : " + error.message);
    }
}

export async function deleteVacationLogic(vacationId: string) {
    try {
        const query = deleteVacationQuery();
        const [result] = await getConnection().execute(query, [vacationId]);
        return result
    } catch (error) {
        console.log("deleteVacationLogic error : " + error.message);
    }
}
export async function updateVacationLogic(body: any, vacationId: string, image_path: string) {
    const {
        vacation_destination,
        vacation_description,
        vacation_start_date,
        vacation_end_date,
        vacation_cost
    } = body
    try {
        const query = updateVacationQuery();
        const [result] = await getConnection().execute(query,
            [vacation_destination,
                vacation_description,
                vacation_start_date,
                vacation_end_date,
                vacation_cost,
                image_path, vacationId]);
        return result
    } catch (error) {
        console.log("updateVacationLogic error : " + error.message);
    }
}

export async function isVacationInDBLogic(vacationId: string) {
    const query = isVacationInDBQuery();
    const [result] = await getConnection().execute(query, [vacationId]);
    if (result.length > 0) return true
    else return false
}
export function replaceImagePath(imgOldPath: string): string {
    let result = imgOldPath.replace(/\\/g, "/").slice(16)
    return result
  }
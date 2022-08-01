import axiosInstance from "../asyncFunctions/index.axios"

const basePath = "/vacations"

export async function getVacationsService(): Promise<any> {
    const { data } = await axiosInstance.get(basePath);
    return data.vacations
}

export async function deleteVacationService(vacation_id: number): Promise<any> {
    const { data } = await axiosInstance.delete(`${basePath}/delete/${vacation_id}`);
    return data
}
export async function getFollowedVacationsService(user_id: any): Promise<any> {
    const { data } = await axiosInstance.get(`${basePath}/following/${user_id}`);
    return data
}
export async function followVacationService(vacation_id: any): Promise<any> {
    const { data } = await axiosInstance.post(`${basePath}/follow/${vacation_id}`);
    return data
}
export async function unfollowVacationService(follow_id: any): Promise<any> {
    const { data } = await axiosInstance.post(`${basePath}/unfollow/${follow_id}`);
    return data
}
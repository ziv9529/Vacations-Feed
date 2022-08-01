import axiosInstance from "../asyncFunctions/index.axios"

const basePath = "/vacations"

export async function getAdminDataService(): Promise<any> {
    const { data } = await axiosInstance.get(basePath);
    return data.vacations
}
export async function addVacationService(payload?: any): Promise<any> {
    const { data } = await axiosInstance.post(basePath, payload);
    return data
}
export async function editVacationService(payload?: any, vacation_id?: any): Promise<any> {
    const { data } = await axiosInstance.put(`${basePath}/update/${vacation_id}`, payload);
    return data
}

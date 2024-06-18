import { api } from "../backend/api"

export const useResale = () => {
    const fetchAllResales = async () => {
        const response = await api.get("/resale/admin")
        return response.data
    }

    return { fetchAllResales }
}

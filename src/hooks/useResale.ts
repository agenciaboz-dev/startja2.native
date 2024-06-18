import { api } from "../backend/api"
import { User } from "../types/server/class"
import { Resale } from "../types/server/class/Resale"

export const useResale = () => {
    const fetchAllResales = async () => {
        const response = await api.get("/resale/admin")
        return response.data as Resale[]
    }

    const fetchResale = async (id: string) => {
        const response = await api.get("/resale", { params: { resale_id: id } })
        return response.data as Resale
    }

    const fetchManagers = async (id: string) => {
        const response = await api.get("/resale/managers", { params: { resale_id: id } })
        return response.data as User[]
    }

    return { fetchAllResales, fetchResale, fetchManagers }
}

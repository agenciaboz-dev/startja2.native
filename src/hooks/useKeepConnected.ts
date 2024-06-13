import AsyncStorage from "@react-native-async-storage/async-storage"
import { useEffect, useState } from "react"

export const useKeepConnected = () => {
    const [value, setValue] = useState(false)

    const fetchKeepConnected = async () => {
        const value = await AsyncStorage.getItem("keepConnected")
        if (value) {
            const keepConnected = JSON.parse(value) as boolean
            setValue(keepConnected)
        }
    }

    const changeValue = async (newValue: boolean) => {
        await AsyncStorage.setItem("keepConnected", JSON.stringify(newValue))
        setValue(newValue)
    }

    useEffect(() => {
        fetchKeepConnected()
    }, [])

    return { value, changeValue }
}

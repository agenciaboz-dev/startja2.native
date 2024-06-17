import React, { useEffect, useRef } from "react"
import { View } from "react-native"
import { useUser } from "../hooks/useUser"
import { useKeepConnected } from "../hooks/useKeepConnected"
import * as SplashScreen from "expo-splash-screen"
import { api } from "../backend/api"

interface HandleKeepSessionProps {}

export const HandleKeepSession: React.FC<HandleKeepSessionProps> = ({}) => {
    const firstRenderUser = useRef(true)
    const firstRenderKeepConnected = useRef(true)
    const shouldExecute = useRef(true)

    const { user, onLogin } = useUser()
    const keepConnected = useKeepConnected()

    const refreshUser = async () => {
        try {
            const response = await api.get("/user", { params: { id: user?.id } })
            const refreshed = response.data
            if (refreshed) {
                onLogin(refreshed)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (firstRenderUser.current) {
            firstRenderUser.current = false
        }
    }, [user])

    useEffect(() => {
        if (firstRenderKeepConnected.current) {
            firstRenderKeepConnected.current = false
        }
    }, [keepConnected.value])

    useEffect(() => {
        if (!shouldExecute.current) return
        console.log({ user, keepConnected: keepConnected.value })
        if (!firstRenderKeepConnected.current && !firstRenderUser.current) {
            if (user) {
                shouldExecute.current = false
                onLogin(user)
                refreshUser()
            }
            SplashScreen.hideAsync()
        }
    }, [user, keepConnected.value])

    return null
}

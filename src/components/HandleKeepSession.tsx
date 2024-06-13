import React, { useEffect, useRef } from "react"
import { View } from "react-native"
import { useUser } from "../hooks/useUser"
import { useKeepConnected } from "../hooks/useKeepConnected"
import * as SplashScreen from "expo-splash-screen"

interface HandleKeepSessionProps {}

export const HandleKeepSession: React.FC<HandleKeepSessionProps> = ({}) => {
    const firstRenderUser = useRef(true)
    const firstRenderKeepConnected = useRef(true)

    const { user, onLogin } = useUser()
    const keepConnected = useKeepConnected()

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
        console.log({ user, keepConnected: keepConnected.value })
        if (!firstRenderKeepConnected.current && !firstRenderUser.current) {
            if (user) {
                onLogin(user)
            }
            SplashScreen.hideAsync()
        }
    }, [user, keepConnected.value])

    return null
}

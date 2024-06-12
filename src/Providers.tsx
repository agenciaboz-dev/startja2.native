import React from "react"
import { navigation_theme, paper_theme } from "./style/theme"
import { PaperProvider, Text } from "react-native-paper"
import { UserProvider } from "./contexts/userContext"
import { NavigationContainer } from "@react-navigation/native"
import constants from "expo-constants"
import { NotificationProvider } from "./contexts/notificationsContext"

interface ProvidersProps {
    children?: React.ReactNode
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
    return (
        <NavigationContainer theme={navigation_theme}>
            <PaperProvider theme={paper_theme}>
                    <UserProvider>
                        <NotificationProvider>
                            {children}
                            {/* <Text style={{ position: "absolute", bottom: 5, right: 5, color: "red" }}>{constants.expoConfig?.version}</Text> */}
                        </NotificationProvider>
                    </UserProvider>
            </PaperProvider>
        </NavigationContainer>
    )
}

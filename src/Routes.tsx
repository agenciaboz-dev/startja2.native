import React, { useEffect } from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { default_navigator_options } from "./tools/default_navigator_options"
import { Platform } from "react-native"
import { Home } from "./Screens/Home/Home"
import { NotFound } from "./Screens/NotFound"

interface RoutesProps {}

export type HomeStackParams = {
    home: undefined
    signup: undefined
    mainscreen: undefined
    chat: undefined
    lesson: undefined
}

const Stack = createNativeStackNavigator<HomeStackParams>()

export const Routes: React.FC<RoutesProps> = ({}) => {
    const ios = Platform.OS == "ios"

    return (
        <Stack.Navigator
            screenOptions={{
                ...default_navigator_options,
                header: undefined,
            }}
        >
            <Stack.Screen name="home" component={Home} options={{ headerShown: false }} />
            <Stack.Screen name="notfound" component={NotFound} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

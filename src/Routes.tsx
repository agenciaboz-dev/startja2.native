import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { default_navigator_options } from "./tools/default_navigator_options"
import { Platform } from "react-native"
import { Home } from "./Screens/Home/Home"
import { NotFound } from "./Screens/NotFound"
import { SystemChooser } from "./Screens/SystemChooser/SystemChooser"
import { AdminScreen } from "./Screens/Admin/AdminScreen"
import { Profile } from "./Screens/Profile/Profile"
import { useUser } from "./hooks/useUser"
import { BottomNav } from "./components/BottomNav/BottomNav"

interface RoutesProps {}

export type HomeStackParams = {
    home: undefined
    notfound: undefined
    systemChooser: undefined
    admin: undefined
    profile: undefined
}

const Stack = createNativeStackNavigator<HomeStackParams>()

export const Routes: React.FC<RoutesProps> = ({}) => {
    const { user } = useUser()

    return (
        <>
            <Stack.Navigator
                screenOptions={{
                    ...default_navigator_options,
                    header: undefined,
                    headerShown: false,
                    gestureEnabled: false,
                }}
            >
                <Stack.Screen name="home" component={Home} />
                <Stack.Screen name="notfound" component={NotFound} />
                <Stack.Screen name="systemChooser" component={SystemChooser} />
                <Stack.Screen name="admin" component={AdminScreen} />
                <Stack.Screen name="profile" component={Profile} />
            </Stack.Navigator>
            {user && Platform.OS !== "web" && <BottomNav />}
        </>
    )
}

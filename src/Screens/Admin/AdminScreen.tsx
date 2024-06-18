import React from "react"
import { Platform, View } from "react-native"
import { useUser } from "../../hooks/useUser"
import { NotFound } from "../NotFound"
import { AdminSideBar } from "./AdminSideBar"
import { ResaleScreen } from "../Resale/ResaleScreen"
import { RouteProp } from "@react-navigation/native"

interface AdminScreenProps {
    route: RouteProp<any, any>
}

export const AdminScreen: React.FC<AdminScreenProps> = ({ route }) => {
    const { user } = useUser()

    return user?.admin ? (
        <View style={[{ flex: 1 }, Platform.OS == "web" && { flexDirection: "row" }]}>
            <AdminSideBar />
            <ResaleScreen route={route} />
        </View>
    ) : (
        <NotFound />
    )
}

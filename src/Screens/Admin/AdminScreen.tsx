import React from "react"
import { Platform, View } from "react-native"
import { useUser } from "../../hooks/useUser"
import { NotFound } from "../NotFound"
import { AdminSideBar } from "./AdminSideBar"

interface AdminScreenProps {}

export const AdminScreen: React.FC<AdminScreenProps> = ({}) => {
    const { user } = useUser()

    return user?.admin ? (
        <View style={[{ flex: 1 }, Platform.OS == "web" && { flexDirection: "row" }]}>
            <AdminSideBar />
        </View>
    ) : (
        <NotFound />
    )
}

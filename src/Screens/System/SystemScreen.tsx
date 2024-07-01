import React from "react"
import { View } from "react-native"
import { Surface } from "react-native-paper"
import { ClienteHeaderToolbar } from "./ClientHeaderToolbar"

interface SystemScreenProps {}

export const SystemScreen: React.FC<SystemScreenProps> = ({}) => {
    return (
        <View style={{ flex: 1, borderColor: "#ff0000", borderWidth: 1, padding: 20 }}>
            <ClienteHeaderToolbar />
        </View>
    )
}

import React from "react"
import { Platform, View } from "react-native"

interface TwoButtonsViewProps {
    children?: React.ReactNode
}

export const TwoButtonsView: React.FC<TwoButtonsViewProps> = ({ children }) => {
    return (
        <View style={[{ flexDirection: "row-reverse", justifyContent: "space-between" }, Platform.OS != "web" && { marginTop: 20 }]}>{children}</View>
    )
}

import React from "react"
import { Platform, View } from "react-native"

interface TwoButtonsViewProps {
    children?: React.ReactNode
}

export const TwoButtonsView: React.FC<TwoButtonsViewProps> = ({ children }) => {
    return (
        <View
            style={[
                Platform.OS == "web"
                    ? { flexDirection: "row-reverse", justifyContent: "space-between" }
                    : { alignItems: "center", gap: 20, marginTop: 20 },
            ]}
        >
            {children}
        </View>
    )
}

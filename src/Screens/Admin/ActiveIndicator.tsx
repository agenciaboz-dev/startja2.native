import React from "react"
import { Platform, View } from "react-native"
import { colors } from "../../style/colors"

interface ActiveIndicatorProps {
    size: number
}

export const ActiveIndicator: React.FC<ActiveIndicatorProps> = ({ size }) => {
    return (
        <View
            style={[
                { position: "absolute", borderColor: colors.primary, borderWidth: 4, top: 0, left: 0, borderRadius: 5 },
                Platform.OS == "web" ? { height: size * 1, left: -5 } : { width: size * 1 },
            ]}
        />
    )
}

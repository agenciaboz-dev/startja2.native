import React from "react"
import { Platform, View, ViewStyle } from "react-native"
import { useTheme } from "react-native-paper"

interface SectionWrapperProps {
    children?: React.ReactNode
    style?: ViewStyle
}

export const SectionWrapper: React.FC<SectionWrapperProps> = ({ children, style }) => {
    const theme = useTheme()

    return (
        <View
            style={[
                { gap: 20, borderTopColor: theme.colors.outlineVariant, borderTopWidth: 1, paddingTop: 20 },
                Platform.OS != "web" && { gap: 10 },
                style,
            ]}
        >
            {children}
        </View>
    )
}

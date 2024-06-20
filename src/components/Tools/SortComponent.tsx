import React from "react"
import { View } from "react-native"
import { IconButton, Surface, Text } from "react-native-paper"
import { colors } from "../../style/colors"

interface SortComponentProps {
    title?: string
}

export const SortComponent: React.FC<SortComponentProps> = ({ title }) => {
    return (
        <View style={[{ borderColor: colors.grey, borderWidth: 1, borderRadius: 5, flexDirection: "row", alignItems: "center", paddingRight: 10 }]}>
            <IconButton icon="swap-vertical" iconColor={colors.primary} style={{ margin: 0 }} />
            {title && <Text style={{ color: colors.primary, fontSize: 16, marginLeft: -5 }}>{title}</Text>}
        </View>
    )
}

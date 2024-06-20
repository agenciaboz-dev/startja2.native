import React from "react"
import { StyleProp, View, ViewStyle } from "react-native"
import { IconButton, Surface, Text } from "react-native-paper"
import { colors } from "../../style/colors"

interface SortComponentProps {
    title?: string
    style?: StyleProp<ViewStyle>
}

export const SortComponent: React.FC<SortComponentProps> = ({ title, style }) => {
    return (
        <View style={[{ borderColor: colors.grey, borderWidth: 1, borderRadius: 5, flexDirection: "row", alignItems: "center" }, style]}>
            <IconButton icon="swap-vertical" iconColor={colors.primary} style={style} />
            {title && <Text style={{ color: colors.primary, fontSize: 16, marginLeft: -15 }}>{title}</Text>}
        </View>
    )
}

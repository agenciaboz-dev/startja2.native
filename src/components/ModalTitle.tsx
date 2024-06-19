import React from "react"
import { View } from "react-native"
import { IconButton, Text } from "react-native-paper"
import { colors } from "../style/colors"

interface ModalTitleProps {
    title: string
    onDismiss: () => void
}

export const ModalTitle: React.FC<ModalTitleProps> = ({ title, onDismiss }) => {
    return (
        <View style={[{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }]}>
            <Text style={[{ fontWeight: "bold", color: colors.grey }]}>{title}</Text>
            <IconButton icon={"close"} style={{ margin: 0 }} onPress={onDismiss} />
        </View>
    )
}

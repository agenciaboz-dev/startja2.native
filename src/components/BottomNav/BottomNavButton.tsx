import React from "react"
import { TouchableOpacity } from "react-native"
import { IconButton, Text } from "react-native-paper"

interface BottomNavButtonProps {
    icon: string
    title: string
    onPress: () => void
}

export const BottomNavButton: React.FC<BottomNavButtonProps> = ({ icon, title, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={{ alignItems: "center" }}>
            <IconButton icon={icon} iconColor="white" style={{ margin: 0 }} />
            <Text style={{ color: "white" }}>{title}</Text>
        </TouchableOpacity>
    )
}

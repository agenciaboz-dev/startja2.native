import React from "react"
import { Button, Icon, Surface, Text } from "react-native-paper"

interface ButtonWithIconProps {
    text: string
    icon?: string
}

export const ButtonWithIcon: React.FC<ButtonWithIconProps> = ({ text, icon = "chevron-down" }) => {
    return (
        <Button
            mode="contained"
            style={{
                height: 40,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Text style={{ marginRight: 10, color: "#fff" }}>{text}</Text>
            <Icon source={icon} size={20} color="#fff"></Icon>
        </Button>
    )
}

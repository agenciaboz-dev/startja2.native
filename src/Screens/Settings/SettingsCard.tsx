import React from "react"
import { Surface, Text } from "react-native-paper"

interface SettingsCardProps {}

export const SettingsCard: React.FC<SettingsCardProps> = ({}) => {
    return (
        <Surface
            style={{
                height: 100,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Text>Teste</Text>
        </Surface>
    )
}

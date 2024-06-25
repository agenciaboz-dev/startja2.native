import React from "react"
import { View } from "react-native"
import { Button, Text } from "react-native-paper"

interface ProfileInfoCardProps {
    description: string
    data: string
}

export const ProfileInfoCard: React.FC<ProfileInfoCardProps> = ({ description, data }) => {
    return (
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <View>
                <Text>{description}</Text>
                <Text>{data}</Text>
            </View>
            <Button mode="contained">Editar</Button>
        </View>
    )
}

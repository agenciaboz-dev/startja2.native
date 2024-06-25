import React from "react"
import { View } from "react-native"
import { Button, Text } from "react-native-paper"

interface ProfileInfoCardProps {
    description: string
    data: string
    onPress: () => void
}

export const ProfileInfoCard: React.FC<ProfileInfoCardProps> = ({ description, data, onPress }) => {
    return (
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <View>
                <Text>{description}</Text>
                <Text>{data}</Text>
            </View>
            <Button mode="contained" onPress={onPress}>
                Editar
            </Button>
        </View>
    )
}

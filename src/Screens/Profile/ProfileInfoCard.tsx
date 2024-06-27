import React from "react"
import { Platform, View } from "react-native"
import { Button, IconButton, Text } from "react-native-paper"
import { colors } from "../../style/colors"

interface ProfileInfoCardProps {
    description: string
    data: string
    onPress: () => void
}

export const ProfileInfoCard: React.FC<ProfileInfoCardProps> = ({ description, data, onPress }) => {
    return (
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <View style={{ flex: 1, marginRight: 10, gap: 5 }}>
                <Text style={{ overflow: "hidden", height: 20 }} numberOfLines={1} ellipsizeMode="tail">
                    {description}
                </Text>
                <Text style={{ overflow: "hidden", height: 20 }} numberOfLines={1} ellipsizeMode="tail">
                    {data}
                </Text>
            </View>
            {Platform.OS === "web" ? (
                <Button mode="contained" onPress={onPress}>
                    Editar
                </Button>
            ) : (
                <IconButton mode="contained" containerColor={colors.primary} iconColor="white" icon={"pencil"} onPress={onPress} />
            )}
        </View>
    )
}

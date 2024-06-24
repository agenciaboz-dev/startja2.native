import React from "react"
import { View } from "react-native"
import { Avatar, IconButton, Surface, Text } from "react-native-paper"
import AvatarImage from "react-native-paper/lib/typescript/components/Avatar/AvatarImage"
import { useUser } from "../../hooks/useUser"
import placeholders from "../../components/Tools/placeholders"
import { Image } from "expo-image"

interface ProfileViewProps {}

export const ProfileView: React.FC<ProfileViewProps> = ({}) => {
    const { user } = useUser()
    return (
        <View style={{ flex: 1, paddingTop: 80, paddingLeft: 50, paddingRight: 500, gap: 20, borderColor: "#ff0000", borderWidth: 1 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderColor: "#ff0000", borderWidth: 1 }}>
                <Text>Minha Conta</Text>
                <IconButton icon="close" />
            </View>
            <Surface style={{ padding: 20, gap: 20 }}>
                <Surface style={{ width: 61, height: 61, borderRadius: 50, position: "relative" }}>
                    <Avatar.Image
                        source={(user && user?.profilePic?.url) || placeholders.user}
                        style={{ width: 60, height: 60, backgroundColor: "transparent", position: "absolute", left: -2, top: -1 }}
                    />
                </Surface>
                <Text>Teste</Text>
            </Surface>
        </View>
    )
}

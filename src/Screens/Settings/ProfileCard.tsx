import React from "react"
import { View } from "react-native"
import { Avatar, IconButton, Surface, Text, useTheme } from "react-native-paper"
import placeholders from "../../components/Tools/placeholders"
import { useUser } from "../../hooks/useUser"
import { colors } from "../../style/colors"
import { useLinkTo } from "@react-navigation/native"

interface ProfileCardProps {}

export const ProfileCard: React.FC<ProfileCardProps> = ({}) => {
    const { user } = useUser()
    const theme = useTheme()
    const linkTo = useLinkTo()
    return (
        <View
            style={{
                alignItems: "center",
                justifyContent: "space-between",
                flexDirection: "row",
                backgroundColor: theme.colors.background,
            }}
        >
            <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                <Surface style={{ borderRadius: 100 }}>
                    <Avatar.Image source={user?.admin ? user.profilePic?.url || placeholders.admin : placeholders.user} />
                </Surface>
                <View>
                    <Text>{user?.name}</Text>
                    <Text>"Administrador Master"</Text>
                </View>
            </View>
            <IconButton icon="cog" onPress={() => linkTo("/profile")} />
        </View>
    )
}

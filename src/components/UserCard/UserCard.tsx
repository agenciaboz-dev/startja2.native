import React from "react"
import { Platform, View } from "react-native"
import { useUser } from "../../hooks/useUser"
import { Surface } from "react-native-paper"
import { Image } from "expo-image"
import { UserData } from "./UserData"
import placeholders from "../Tools/placeholders"
import { phoneMask } from "../../tools/phoneMask"
import { emailMask } from "../../tools/emailMask"

interface UserCardProps {}

export const UserCard: React.FC<UserCardProps> = ({}) => {
    const { user } = useUser()

    return user ? (
        <Surface style={[{ borderRadius: 15, padding: 20, gap: 20 }, Platform.OS == "web" ? { flexDirection: "row" } : {}]}>
            <View style={[Platform.OS != "web" && { flexDirection: "row", alignItems: "center", gap: 20 }]}>
                <Image
                    source={user.profilePic?.url}
                    contentFit="cover"
                    style={{ width: 100, height: 100, borderRadius: 100 }}
                    placeholder={user.admin ? placeholders.admin : placeholders.user}
                    placeholderContentFit="cover"
                />
                {Platform.OS !== "web" && <UserData title="NOME DE USUÁRIO" value={user.name} />}
            </View>
            {Platform.OS == "web" ? (
                <View style={{ gap: 5 }}>
                    <UserData title="NOME DE USUÁRIO" value={user.name} />
                    <UserData title="TELEFONE" value={phoneMask(user.phone)} />
                </View>
            ) : (
                <>
                    <UserData title="E-MAIL" value={emailMask(user.email)} />
                    <UserData title="TELEFONE" value={phoneMask(user.phone)} />
                </>
            )}
            {Platform.OS == "web" && <UserData title="E-MAIL" value={emailMask(user.email)} style={{ marginLeft: "auto" }} />}
        </Surface>
    ) : null
}

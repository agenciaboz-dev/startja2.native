import React, { useState } from "react"
import { View } from "react-native"
import { Avatar, IconButton, Surface, Text, Button } from "react-native-paper"
import AvatarImage from "react-native-paper/lib/typescript/components/Avatar/AvatarImage"
import { useUser } from "../../hooks/useUser"
import placeholders from "../../components/Tools/placeholders"
import { Image } from "expo-image"
import { ProfileInfoCard } from "./ProfileInfoCard"
import { colors } from "../../style/colors"
import { PasswordModal } from "./Modals/PasswordModal"
import { DisableAccountModal } from "./Modals/DisableAccountModal"
import { DeleteAccountModal } from "./Modals/DeleteAccountModal"
import { UserNameModal } from "./Modals/UserNameModal"
import { UserEmailModal } from "./Modals/UserEmailModal"
import { UserPhoneModal } from "./Modals/UserPhoneModal"

interface ProfileViewProps {}

export const ProfileView: React.FC<ProfileViewProps> = ({}) => {
    const { user } = useUser()
    const [hover, setHover] = useState(false)
    const [openUserNameModal, setOpenUserNameModal] = useState(false)
    const [openUserEmailModal, setOpenUserEmailModal] = useState(false)
    const [openPhoneModal, setOpenPhoneModal] = useState(false)
    const [openPasswordModal, setOpenPasswordModal] = useState(false)
    const [openDisableAccountModal, setOpenDisableAccountModal] = useState(false)
    const [openDeleteAccountModal, setOpenDeleteAccountModal] = useState(false)

    return (
        <View style={{ flex: 1, paddingTop: 80, paddingLeft: 50, paddingRight: 500, gap: 40 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <Text variant="headlineSmall">Minha Conta</Text>
                <IconButton icon="close" />
            </View>
            <Surface style={{ padding: 20, gap: 30, backgroundColor: colors.secondary }}>
                <View style={{ flexDirection: "row", gap: 15, alignItems: "center" }}>
                    <Surface style={{ width: 61, height: 61, borderRadius: 50, position: "relative" }}>
                        <Avatar.Image
                            source={(user && user?.profilePic?.url) || placeholders.user}
                            style={{ width: 60, height: 60, backgroundColor: "transparent", position: "absolute", left: -2, top: -1 }}
                        />
                    </Surface>
                    <Text variant="headlineSmall">{user?.name}</Text>
                </View>
                <View style={{ padding: 20, gap: 20, backgroundColor: colors.box }}>
                    <ProfileInfoCard description="NOME DE USUÁRIO" data={user!.name} onPress={() => setOpenUserNameModal(true)} />
                    <ProfileInfoCard description="EMAIL" data={user!.email} onPress={() => setOpenUserEmailModal(true)} />
                    <ProfileInfoCard description="TELEFONE" data={user!.phone} onPress={() => setOpenPhoneModal(true)} />
                </View>
            </Surface>
            <View style={{ gap: 15 }}>
                <Text variant="headlineSmall">Senhas e Autenticações</Text>
                <Button mode="contained" style={{ alignSelf: "flex-start" }} onPress={() => setOpenPasswordModal(true)}>
                    Alterar senha
                </Button>
            </View>
            <View style={{ gap: 15 }}>
                <Text variant="headlineSmall">Deletar conta</Text>
                <Text> Desativar sua conta significa que você pode recuperá-la a qualquer momento após realizar esta ação</Text>
                <View style={{ flexDirection: "row", gap: 15 }}>
                    <Button mode="contained-tonal" textColor={colors.dark} onPress={() => setOpenDisableAccountModal(true)}>
                        Desabilitar Conta
                    </Button>
                    <Button mode="contained" buttonColor={colors.grey} dark onPress={() => setOpenDeleteAccountModal(true)}>
                        Deletar Conta
                    </Button>
                </View>
            </View>
            <UserNameModal visible={openUserNameModal} onDismiss={() => setOpenUserNameModal(false)} />
            <UserEmailModal visible={openUserEmailModal} onDismiss={() => setOpenUserEmailModal(false)} />
            <UserPhoneModal visible={openPhoneModal} onDismiss={() => setOpenPhoneModal(false)} />
            <PasswordModal visible={openPasswordModal} onDismiss={() => setOpenPasswordModal(false)} />
            <DisableAccountModal visible={openDisableAccountModal} onDismiss={() => setOpenDisableAccountModal(false)} />
            <DeleteAccountModal visible={openDeleteAccountModal} onDismiss={() => setOpenDeleteAccountModal(false)} />
        </View>
    )
}

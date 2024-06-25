import React, { useState } from "react"
import { Platform, View } from "react-native"
import { Button, IconButton, Modal, Portal, Text, TextInput } from "react-native-paper"
import { colors } from "../../../style/colors"

interface UserEmailModalProps {
    visible: boolean
    onDismiss: () => void
}

export const UserEmailModal: React.FC<UserEmailModalProps> = ({ visible, onDismiss }) => {
    const [emailActive, setEmailActive] = useState(false)
    const [newEmailActive, setNewEmailActive] = useState(false)
    const [passwordActive, setPasswordActive] = useState(false)

    return (
        <Portal>
            <Modal
                visible={visible}
                onDismiss={onDismiss}
                contentContainerStyle={[
                    {
                        backgroundColor: colors.box,
                        alignSelf: "center",
                        padding: 20,
                        gap: 20,
                        borderRadius: 10,
                    },
                    Platform.OS == "web" && {},
                ]}
            >
                <View style={{ gap: 20 }}>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <Text variant="headlineSmall">Alterar email do usuário</Text>
                        <IconButton icon="close" onPress={onDismiss} />
                    </View>
                    <Text>Forneça um endereço de email válido para receber notificações e recuperar sua conta</Text>
                    <TextInput
                        mode="outlined"
                        placeholder="Digite o endereço de email atual"
                        label={emailActive ? "Endereço de email atual" : "Digite o endereço de email atual"}
                        onFocus={() => setEmailActive(true)}
                        onBlur={() => setEmailActive(false)}
                    />
                    <TextInput
                        mode="outlined"
                        placeholder="Digite o novo endereço de email"
                        label={newEmailActive ? "Novo email" : "Digite o novo endereço de email"}
                        onFocus={() => setNewEmailActive(true)}
                        onBlur={() => setNewEmailActive(false)}
                    />
                    <TextInput
                        mode="outlined"
                        placeholder="Insira sua senha"
                        label={passwordActive ? "Senha" : "Insira sua senha"}
                        onFocus={() => setPasswordActive(true)}
                        onBlur={() => setPasswordActive(false)}
                    />
                    <Button mode="contained" style={{ alignSelf: "flex-end" }}>
                        Atualizar
                    </Button>
                </View>
            </Modal>
        </Portal>
    )
}

import React, { useState } from "react"
import { Platform, View } from "react-native"
import { Button, IconButton, Modal, Portal, Text, TextInput } from "react-native-paper"
import { colors } from "../../../style/colors"

interface PasswordModalProps {
    visible: boolean
    onDismiss: () => void
}

export const PasswordModal: React.FC<PasswordModalProps> = ({ visible, onDismiss }) => {
    const [oldPasswordActive, setOldPasswordActive] = useState(false)
    const [newPasswordActive, setNewPasswordActive] = useState(false)
    const [passwordConfirmActive, setpasswordConfirmActive] = useState(false)
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
                    Platform.OS !== "web" && { width: "90%" },
                ]}
            >
                <View style={{ gap: 20 }}>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <Text variant="headlineSmall">Alterar Senha</Text>
                        <IconButton icon="close" onPress={onDismiss} />
                    </View>
                    <Text>Crie uma nova senha forte para melhorar a segurança da sua conta.</Text>
                    <TextInput
                        mode="outlined"
                        placeholder="Insira sua senha antiga"
                        label={oldPasswordActive ? "Senha antiga" : "Insira sua senha antiga"}
                        onFocus={() => setOldPasswordActive(true)}
                        onBlur={() => setOldPasswordActive(false)}
                    />
                    <TextInput
                        mode="outlined"
                        placeholder="Insira sua nova senha"
                        label={passwordConfirmActive ? "Nova senha" : "Insira sua nova senha"}
                        onFocus={() => setpasswordConfirmActive(true)}
                        onBlur={() => setpasswordConfirmActive(false)}
                    />
                    <TextInput
                        mode="outlined"
                        placeholder="Confirme sua nova senha"
                        label={newPasswordActive ? "Confirme nova senha" : "Confirme sua nova senha"}
                        onFocus={() => setNewPasswordActive(true)}
                        onBlur={() => setNewPasswordActive(false)}
                    />
                    <Button mode="contained" style={{ alignSelf: "flex-end" }}>
                        Atualizar
                    </Button>
                </View>
            </Modal>
        </Portal>
    )
}

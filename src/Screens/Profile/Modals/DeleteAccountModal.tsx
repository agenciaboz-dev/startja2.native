import React, { useState } from "react"
import { Platform, View } from "react-native"
import { Button, IconButton, Modal, Portal, Text, TextInput } from "react-native-paper"
import { colors } from "../../../style/colors"

interface DeleteAccountModalProps {
    visible: boolean
    onDismiss: () => void
}

export const DeleteAccountModal: React.FC<DeleteAccountModalProps> = ({ visible, onDismiss }) => {
    const [deleteActive, setDeleteActive] = useState(false)
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
                        maxWidth: 500,
                    },
                    Platform.OS == "web" && {},
                ]}
            >
                <View style={{ gap: 20 }}>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <Text variant="headlineSmall">Deletar sua conta</Text>
                        <IconButton icon="close" onPress={onDismiss} />
                    </View>
                    <Text>
                        Você está prestes a deletar sua conta permanentemente. Esta ação é irreversível e resultará na perda de todos os seus dados.
                        Temcerteza que deseja continuar?
                    </Text>
                    <TextInput
                        mode="outlined"
                        placeholder="Por favor digite DELETAR"
                        label={deleteActive ? "Digite DELETAR" : "Por favor digite DELETAR"}
                        onFocus={() => setDeleteActive(true)}
                        onBlur={() => setDeleteActive(false)}
                    />
                    <TextInput
                        mode="outlined"
                        placeholder="Insira sua senha"
                        label={passwordActive ? "Senha" : "Insira sua senha"}
                        onFocus={() => setPasswordActive(true)}
                        onBlur={() => setPasswordActive(false)}
                    />
                    <Button mode="contained" buttonColor={colors.dark} dark style={{ alignSelf: "flex-end" }}>
                        Deletar
                    </Button>
                </View>
            </Modal>
        </Portal>
    )
}

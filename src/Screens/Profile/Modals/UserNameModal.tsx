import React, { useState } from "react"
import { Platform, View } from "react-native"
import { Button, IconButton, Modal, Portal, Text, TextInput } from "react-native-paper"
import { colors } from "../../../style/colors"

interface UserNameModalProps {
    visible: boolean
    onDismiss: () => void
}

export const UserNameModal: React.FC<UserNameModalProps> = ({ visible, onDismiss }) => {
    const [nameActive, setNameActive] = useState(false)
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
                        <Text variant="headlineSmall">Alterar nome de usuário</Text>
                        <IconButton icon="close" onPress={onDismiss} />
                    </View>
                    <Text>Escolha um novo nome de usuário que será usado para o seu login no sistema</Text>
                    <TextInput
                        mode="outlined"
                        placeholder="Digite seu novo nome de usuário"
                        label={nameActive ? "Novo nome de usuário" : "Digite seu novo nome de usuário"}
                        // label="Novo nome de usuário"
                        onFocus={() => setNameActive(true)}
                        onBlur={() => setNameActive(false)}
                    />
                    <TextInput
                        mode="outlined"
                        placeholder="Insira sua senha"
                        label={passwordActive ? "Senha" : "Insira sua senha"}
                        // label="Novo nome de usuário"
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

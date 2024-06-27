import React, { useState } from "react"
import { Platform, View } from "react-native"
import { Button, IconButton, Modal, Portal, Text, TextInput } from "react-native-paper"
import { colors } from "../../../style/colors"

interface UserPhoneModalProps {
    visible: boolean
    onDismiss: () => void
}

export const UserPhoneModal: React.FC<UserPhoneModalProps> = ({ visible, onDismiss }) => {
    const [phoneActive, setPhoneActive] = useState(false)
    const [newPhoneActive, setNewPhoneActive] = useState(false)
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
                    Platform.OS !== "web" && { width: "90%" },
                ]}
                style={{}}
            >
                <View style={{ gap: 20 }}>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <Text variant="headlineSmall">Alterar telefone</Text>
                        <IconButton icon="close" onPress={onDismiss} />
                    </View>
                    <Text>Atualize seu número de telefone para garantir que podemos contatá-lo quando necessário.</Text>
                    <TextInput
                        mode="outlined"
                        placeholder="Digite seu telefone atual"
                        label={phoneActive ? "Telefone atual" : "Digite seu telefone atual"}
                        onFocus={() => setPhoneActive(true)}
                        onBlur={() => setPhoneActive(false)}
                    />
                    <TextInput
                        mode="outlined"
                        placeholder="Digite seu novo telefone"
                        label={newPhoneActive ? "Novo telefone" : "Digite seu novo telefone"}
                        onFocus={() => setNewPhoneActive(true)}
                        onBlur={() => setNewPhoneActive(false)}
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

import React, { useState } from "react"
import { Platform, View } from "react-native"
import { Button, IconButton, Modal, Portal, Text, TextInput } from "react-native-paper"
import { colors } from "../../../style/colors"

interface DisableAccountModalProps {
    visible: boolean
    onDismiss: () => void
}

export const DisableAccountModal: React.FC<DisableAccountModalProps> = ({ visible, onDismiss }) => {
    const [disableActive, setDisableActive] = useState(false)
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
                        <Text variant="headlineSmall">Desabilitar sua conta</Text>
                        <IconButton icon="close" onPress={onDismiss} />
                    </View>
                    <Text>
                        Você está prestes a desabilitar sua conta. Isso irá retringir o acesso à sua conta, mas seus dados serão preservados. Você
                        pode reativála a qualquer momento. Deseja continuar?
                    </Text>
                    <TextInput
                        mode="outlined"
                        placeholder="Por favor digite DESABILITAR"
                        label={disableActive ? "Digite DESABILITAR" : "Por favor digite DESABILITAR"}
                        onFocus={() => setDisableActive(true)}
                        onBlur={() => setDisableActive(false)}
                    />
                    <TextInput
                        mode="outlined"
                        placeholder="Insira sua senha"
                        label={passwordActive ? "Senha" : "Insira sua senha"}
                        onFocus={() => setPasswordActive(true)}
                        onBlur={() => setPasswordActive(false)}
                    />
                    <Button mode="contained" buttonColor={colors.grey} dark style={{ alignSelf: "flex-end" }}>
                        Desabilitar
                    </Button>
                </View>
            </Modal>
        </Portal>
    )
}

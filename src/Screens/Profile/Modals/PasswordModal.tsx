import React from "react"
import { View } from "react-native"
import { Modal, Portal, Surface } from "react-native-paper"

interface PasswordModalProps {
    visible: boolean
    onDismiss: () => void
}

export const PasswordModal: React.FC<PasswordModalProps> = ({ visible, onDismiss }) => {
    return (
        <Portal>
            <Modal visible={visible} onDismiss={onDismiss}>
                <View></View>
            </Modal>
        </Portal>
    )
}

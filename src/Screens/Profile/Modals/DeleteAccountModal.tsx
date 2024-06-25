import React from "react"
import { View } from "react-native"
import { Modal, Portal } from "react-native-paper"

interface DeleteAccountModalProps {
    visible: boolean
    onDismiss: () => void
}

export const DeleteAccountModal: React.FC<DeleteAccountModalProps> = ({ visible, onDismiss }) => {
    return (
        <Portal>
            <Modal visible={visible} onDismiss={onDismiss}>
                <View></View>
            </Modal>
        </Portal>
    )
}

import React from "react"
import { View } from "react-native"
import { Modal, Portal, Surface } from "react-native-paper"

interface DisableAccountModalProps {
    visible: boolean
    onDismiss: () => void
}

export const DisableAccountModal: React.FC<DisableAccountModalProps> = ({ visible, onDismiss }) => {
    return (
        <Portal>
            <Modal visible={visible} onDismiss={onDismiss}>
                <View></View>
            </Modal>
        </Portal>
    )
}

import React from "react"
import { View } from "react-native"
import { Modal, Portal } from "react-native-paper"

interface UserEmailModalProps {
    visible: boolean
    onDismiss: () => void
}

export const UserEmailModal: React.FC<UserEmailModalProps> = ({ visible, onDismiss }) => {
    return (
        <Portal>
            <Modal visible={visible} onDismiss={onDismiss}>
                <View></View>
            </Modal>
        </Portal>
    )
}

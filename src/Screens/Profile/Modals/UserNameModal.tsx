import React from "react"
import { View } from "react-native"
import { Modal, Portal } from "react-native-paper"

interface UserNameModalProps {
    visible: boolean
    onDismiss: () => void
}

export const UserNameModal: React.FC<UserNameModalProps> = ({ visible, onDismiss }) => {
    return (
        <Portal>
            <Modal visible={visible} onDismiss={onDismiss}>
                <View></View>
            </Modal>
        </Portal>
    )
}

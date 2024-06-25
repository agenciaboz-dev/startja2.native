import React from "react"
import { View } from "react-native"
import { Modal, Portal } from "react-native-paper"

interface UserPhoneModalProps {
    visible: boolean
    onDismiss: () => void
}

export const UserPhoneModal: React.FC<UserPhoneModalProps> = ({ visible, onDismiss }) => {
    return (
        <Portal>
            <Modal visible={visible} onDismiss={onDismiss}>
                <View></View>
            </Modal>
        </Portal>
    )
}
